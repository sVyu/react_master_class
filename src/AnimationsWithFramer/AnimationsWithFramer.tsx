import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  height: 60vh;
  gap: 10px;
`;

const Box = styled(motion.div)`
  /* height: 30vh; */
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const AnimationsWithFramer = () => {
  return (
    <Wrapper>
      <Grid>
        {Array.from({ length: 4 }, (_, i) => i).map((n) => (
          <Box key={n} />
        ))}
      </Grid>
    </Wrapper>
  );
};
