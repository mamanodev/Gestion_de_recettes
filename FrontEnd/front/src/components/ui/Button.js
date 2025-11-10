import styled from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.6rem 1.2rem;
  border: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.05s ease, filter 0.2s ease;

  &:hover { filter: brightness(0.98); }
  &:active { transform: translateY(1px); }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

export default Button;

