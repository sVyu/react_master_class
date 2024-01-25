import styled from 'styled-components';
import { Variants, motion } from 'framer-motion';
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
  gap: 5vh;
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

const boxVariants: Variants = {
  hover: ({ originX, originY }: IOriginCoords) => ({
    scale: 1.1,
    // originX,
    // originY,
  }),
};

const Button = styled(motion.button)`
  background-color: white;
  border-radius: 5px;
  border: none;
  padding: 10px;
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

interface IOriginCoords {
  originX: number;
  originY: number;
}

export const AnimationsWithFramer = () => {
  const [targetIndex, setTargetIndex] = useState<number>(1);
  const handleClickButton = () => {
    if (targetIndex === 1) {
      setTargetIndex(2);
    } else {
      setTargetIndex(1);
    }
  };

  const originCoords: IOriginCoords[] = [
    { originX: 1, originY: 1 },
    { originX: 0, originY: 1 },
    { originX: 1, originY: 0 },
    { originX: 0, originY: 0 },
  ];

  return (
    <Wrapper>
      <Grid>
        {Array.from({ length: 4 }, (_, i) => i).map((n, i) => (
          <Box
            key={n}
            custom={originCoords[i]}
            variants={boxVariants}
            whileHover="hover"
            style={{
              originX: originCoords[i].originX,
              originY: originCoords[i].originY,
            }}
          >
            {targetIndex === n && <Circle layoutId="circle" />}
          </Box>
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
