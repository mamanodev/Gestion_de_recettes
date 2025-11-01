import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";


const signToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export const register = async (req, res,next ) => {
    try {       
        const { username, password } = req.body;
        if (!username.trim() || !password.trim()) {
            return res.status(400).json({ message: "Le nom d'utilisateur et le mot de passe sont requis." });
        }
        const existingUser = await User.scope("withPassword").findOne({ where: { username } });
        if (existingUser) {
                return res.status(409).json({ message: "Le nom d'utilisateur existe déjà." });
            }
        const newUser = await User.create({ username, password });
        const token = signToken(newUser);
        res.status(201).json({ newUser, token });
    }catch (error) {
      next(error);
    }
};

export const login = async (req, res,next) => {
    try {       
        const { username, password } = req.body;
        const user = await User.scope("withPassword").findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
        }
        const token = signToken(user);
        res.status(200).json({ user:await User.findByPk(user.id), token });
    } catch (error) {
      next(error);
    }   
};

export const me = async (req, res,next) => {
    res.json({ user: req.user });
};