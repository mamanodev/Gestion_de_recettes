import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const Dialog = styled.div`
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.18);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h5`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const Close = styled.button`
  border: 0;
  background: transparent;
  font-size: 1.1rem;
  cursor: pointer;
`;

const Body = styled.div`
  padding: 1rem;
`;

const Footer = styled.div`
  padding: 0.9rem 1rem;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  border-top: 1px solid #e5e7eb;
`;

const Secondary = styled.button`
  border: 1px solid #cbd5e1;
  background: #fff;
  color: #334155;
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  cursor: pointer;
`;

const Primary = styled.button`
  border: 0;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  cursor: pointer;
`;

export default function ConfirmModal({ show, onClose, onConfirm, message }) {
  if (!show) return null;

  return (
    <Overlay>
      <Dialog>
        <Header>
          <Title>Confirmation</Title>
          <Close type="button" onClick={onClose} aria-label="Fermer">×</Close>
        </Header>

        <Body>
          <p>{message || "Voulez-vous vraiment supprimer cet AclAcment ?"}</p>
        </Body>

        <Footer>
          <Secondary type="button" onClick={onClose}>Annuler</Secondary>
          <Primary type="button" onClick={onConfirm}>Oui</Primary>
        </Footer>
      </Dialog>
    </Overlay>
  );
}

