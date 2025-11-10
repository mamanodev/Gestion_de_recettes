import { useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../components/AuthContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // �o. import du toast
import "react-toastify/dist/ReactToastify.css";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Page = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
`;

const Container = styled.section`
  width: 100%;
  max-width: 300px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  overflow: hidden;
`;



const FormBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem 2rem 1.5rem;
`;


const Title = styled.h4`
  margin-top: 2rem;
  color: #6b7280;
  font-weight: 600;
`;

const Field = styled.div`
  margin-bottom: 12px;
`;

const ErrorMsg = styled.p`
  color: #dc2626;
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { username, password });
      login(res.data.token, res.data.user);
      toast.success("Connectéavec succès ! Bienvenue ", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/recipes");
    } catch (err) {
      toast.error("Echec de connexion ! ", {
        position: "top-right",
        autoClose: 3000,
      });
      setMessage("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  return (
    <Page>
      <Container>
        <FormBox>
          <Title>Connexion</Title>
          <form onSubmit={handleSubmit}>
            <Field>
              <Input
                type="text"
                id="username"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Field>
            <Field>
              <Input
                type="password"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>
            <Button type="submit" style={{ width: '100%' }}>Se connecter</Button>
          </form>
          <ErrorMsg>{message}</ErrorMsg>

        </FormBox>
      </Container>
    </Page>
  );
}
