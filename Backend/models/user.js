import { DataTypes,Model } from "sequelize";
import { sequelize } from "../config/database.js";
import bcrypt from "bcrypt";
import { Hooks } from "sequelize/lib/hooks";

export class User extends Model {
    async validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
    toJSON() {
        const values = { ...this.get() };
        delete values.password;
        return values;
    }  
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);          
            user.password = await bcrypt.hash(user.password, salt);

        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    },
    defaultScope: {
        attributes: { exclude: ['password'] },
    }, 
    scopes: {
        withPassword: {},
    }
    });