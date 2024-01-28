import styled from 'styled-components';

const LoaderContainer = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

export const Loader = () => {
  return <LoaderContainer>Loading...</LoaderContainer>;
};
