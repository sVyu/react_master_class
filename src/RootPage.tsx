import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const GridContainer = styled.div`
  width: 100vw;
  /* max-width: 100%; */
  height: 100vh;
  background-color: black;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row: auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding: 20px;
`;

const BoxContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #5151e5;
  border: 0.35vw solid #191960;
  border-radius: 30px;
  overflow: hidden;
`;

const Box = styled(motion.div)<{ $bgImage: string }>`
  width: 100%;
  height: 100%;
  background-image: ${(props) => props.$bgImage};
  /* border-radius: 1px; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3vw;
  /* font: serif; */
  font-family: 'Staatliches', cursive;
  /* text-decoration: underline; */
  cursor: pointer;
`;

const BoxVariants = {
  hover: {
    scale: 1.1,
  },
};

export const RootPage = () => {
  const navigate = useNavigate();

  return (
    <GridContainer>
      <BoxContainer>
        <Box
          variants={BoxVariants}
          whileHover="hover"
          $bgImage={`linear-gradient(to top left, #c6ffdd, #fbd786, #f7797d)`}
          onClick={() => navigate('/crypto_tracker_clone')}
          style={{
            textShadow: '0px 0px 5px red',
          }}
        >
          Crypto Tracker Clone
        </Box>
      </BoxContainer>
      <BoxContainer>
        <Box
          variants={BoxVariants}
          whileHover="hover"
          $bgImage={`linear-gradient(to top right, #00E4FF, #69ff97)`}
          onClick={() => navigate('/category_boards')}
          style={{
            textShadow: '0px 0px 5px blue',
          }}
        >
          Category Boards
        </Box>
      </BoxContainer>
      <BoxContainer>
        <Box
          whileHover="hover"
          variants={BoxVariants}
          $bgImage={`linear-gradient(to bottom left, #fc5c7d 50%, #6a82fb);`}
          onClick={() => navigate('/animations_with_framer')}
          style={{
            textShadow: '0px 0px 5px orange',
          }}
        >
          Animations With Framer
        </Box>
      </BoxContainer>
      <BoxContainer>
        <Box
          variants={BoxVariants}
          whileHover="hover"
          $bgImage={`linear-gradient(to bottom right, #0f0c29, #302b63, #24243e) `}
          onClick={() => navigate('/vyuflix_clone')}
          style={{
            textShadow: '0px 0px 5px purple',
          }}
        >
          Vyuflix Clone
        </Box>
      </BoxContainer>
    </GridContainer>
  );
};
