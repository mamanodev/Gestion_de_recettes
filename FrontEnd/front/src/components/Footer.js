import React from "react";
import styled from "styled-components";

const Bar = styled.footer`
  background: ${({ theme }) => theme.colors.warning};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 2rem;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h5`
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const Accent = styled.span`
  color: #ffffff;
`;

const Small = styled.small`
  display: block;
  color: #6b7280;
`;

export default function Footer() {
  return (
    <Bar>
      <Inner>
        <div>
          <Title>
            <Accent>RECETTE</Accent>APP
          </Title>
          <Small>
            DAccouvrez et partagez vos recettes prAcfAcrAces !<br />
            &copy; {new Date().getFullYear()} RecetteApp �?" CrAcAc avec �?\u000f�,? par Ermane Veillard
          </Small>
        </div>
      </Inner>
    </Bar>
  );
}

