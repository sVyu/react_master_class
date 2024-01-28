import styled from 'styled-components';

const LoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  font-size: 3vw;
`;

export const Loader = () => {
  return <LoaderContainer>Loading...</LoaderContainer>;
};
