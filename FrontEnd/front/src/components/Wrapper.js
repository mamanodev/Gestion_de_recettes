import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bg};
`;

const Wrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;
