import styled from 'styled-components';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useState } from 'react';

const Wrapper = styled(motion.div)`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
  flex-direction: column;
  gap: 3vh;
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

const Button = styled(motion.button)`
  background-color: white;
  border-radius: 5px;
  width: 5vw;
  height: 4vh;
  border: none;
  cursor: pointer;
  font-size: 15px;
`;

const buttonVariants: Variants = {
  default: { color: '#452dbb' },
  toggled: { color: '#eb7b52', scale: 1.2 },
};

const Circle = styled(motion.div)`
  background-color: white;
  border-radius: 50px;
  width: 5vw;
  height: 5vw;
  box-shadow: 0px 1px 3px 1px gray;
  position: absolute;
`;

export const AnimationsWithFramer = () => {
  const [targetIndex, setTargetIndex] = useState<number>(1);
  const handleClickButton = () => {
    if (targetIndex === 1) {
      setTargetIndex(2);
    } else {
      setTargetIndex(1);
    }
  };

  return (
    <Wrapper>
      <Grid>
        {Array.from({ length: 4 }, (_, i) => i).map((n) => (
          <Box key={n}>{targetIndex === n && <Circle layoutId="circle" />}</Box>
        ))}
      </Grid>
      <Button
        onClick={handleClickButton}
        variants={buttonVariants}
        animate={targetIndex === 1 ? 'default' : 'toggled'}
      >
        Switch
      </Button>
    </Wrapper>
  );
};
