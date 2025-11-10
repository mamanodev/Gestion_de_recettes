import styled from 'styled-components';

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: box-shadow 0.2s, border-color 0.2s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(31, 81, 255, 0.15);
  }
`;

export default Textarea;

