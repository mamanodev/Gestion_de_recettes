import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Bar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.span`
  font-weight: 700;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
`;


const NavRight = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 14px;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const LogoutButton = styled.button`
  padding: 0.35rem 0.7rem;
  border: 0px solid ${({ theme }) => theme.colors.primary};
  background: transparent;
    font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;


export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Nav>
      <Bar>
        <Link to="/recipes" style={{ textDecoration: 'none' }}>
          <Brand>
            Recette App
          </Brand>
        </Link>

        <NavRight>
          {token ? (
            <>
              <NavLink to="/recipes">Recettes</NavLink>
              <NavLink to="/recipes/add">Ajouter recette</NavLink>


              <LogoutButton onClick={handleLogout}>Se deconnecter </LogoutButton>
            </>
          ) : (<>

            <NavLink to="/login">Se connecter</NavLink>
            <NavLink to="/signup">S'inscrire</NavLink>
          </>)}
        </NavRight>
      </Bar>
    </Nav>
  );
}

