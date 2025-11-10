import React from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  width: 18rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
`;

const Title = styled.h5`
  margin: 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 700;
`;

const Text = styled.p`
  color: #6b7280;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 0.75rem;
`;
const ActionsButtons = styled.div`
  display: flex;
  justify-content: flex-between;
  gap: 25px;
  margin-top: 0.75rem;
`;
const variantStyles = {
    primary: css`background-color: ${({ theme }) => theme.colors.primary};`,
    secondary: css`background-color: #6c757d;`,
    warning: css`background-color: ${({ theme }) => theme.colors.warning}; color: #000;`,
    danger: css`background-color: ${({ theme }) => theme.colors.danger};`,
};

const ActionButton = styled.button`
  text-decoration: none;
  color: #fff;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  border: 0;
  cursor: pointer;
  ${({ variant }) => variantStyles[variant || 'primary']}
`;

const Card = ({ image, title, text, onClick, buttons = [] }) => {
    const navigate = useNavigate();

    return (
        <CardContainer onClick={onClick}>
            {image && <Img src={image} alt={title || "Card image"} />}
            <Body onClick={(e) => e.stopPropagation()}>
                <div>
                    <Title>{title || "Titre"}</Title>
                    <Text>{text || "Texte descriptif"}</Text>
                </div>

                <ActionsButtons>
                    {buttons.length > 0 && (
                        <Actions>
                            {buttons.map((btn, idx) =>
                                btn.type === "link" ? (
                                    <ActionButton
                                        key={idx}
                                        onClick={() => navigate(btn.href)}
                                        variant={btn.variant || "primary"}
                                    >
                                        {btn.label}
                                    </ActionButton>
                                ) : (
                                    <ActionButton
                                        key={idx}
                                        onClick={btn.onClick}
                                        variant={btn.variant || "secondary"}
                                    >
                                        {btn.label}
                                    </ActionButton>
                                )
                            )}
                        </Actions>
                    )}
                </ActionsButtons>
            </Body>
        </CardContainer>
    );
};

export default Card;

