import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  font-family: sans-serif;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <p>MIT License</p>
      <p>Copyright (c) 2024 sVyu</p>
    </FooterContainer>
  );
};
