import styled from 'styled-components';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useState } from 'react';

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(0, 0, 0);
`;

const Slider = styled.div`
  width: 100%;
  height: 90%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
  flex-direction: column;
  overflow: hidden;
  gap: 5vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 25vw;
  height: 25vh;
`;

const LightBox = styled(Box)`
  background-color: rgba(255, 255, 255, 0.6);
`;

const boxVariants: Variants = {
  hover: {
    scale: 1.1,
  },
};

const Button = styled(motion.button)`
  background-color: white;
  border-radius: 5px;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 15px;
  position: absolute;
  bottom: 5vh;
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

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
`;

const overlayVariants: Variants = {
  initial: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  animate: { backgroundColor: 'rgba(163, 78, 161, 0.95)' },
  exit: { backgroundColor: 'rgba(0, 0, 0, 0)' },
};

interface IOriginCoords {
  originX: number;
  originY: number;
}

const originCoords: IOriginCoords[] = [
  { originX: 1, originY: 1 },
  { originX: 0, originY: 1 },
  { originX: 1, originY: 0 },
  { originX: 0, originY: 0 },
];

const nonClickedBoxId = -1;

export const AnimationsWithFramer = () => {
  const [targetIndex, setTargetIndex] = useState<number>(1);
  const [clickedBoxId, setclickedBoxId] = useState<number>(nonClickedBoxId);
  const handleClickButton = () => {
    if (targetIndex === 1) {
      setTargetIndex(2);
    } else {
      setTargetIndex(1);
    }
  };
  const handleChangeSelectedBoxId = (id: number) => () => setclickedBoxId(id);

  return (
    <Wrapper>
      <Slider>
        <Grid>
          {Array.from({ length: 4 }, (_, i) => i).map((n, i) => (
            <LightBox
              key={n}
              // custom={originCoords[i]}
              variants={boxVariants}
              whileHover="hover"
              style={{
                originX: originCoords[i].originX,
                originY: originCoords[i].originY,
              }}
              layoutId={i.toString()}
              onClick={handleChangeSelectedBoxId(i)}
            >
              {targetIndex === n && <Circle layoutId="circle" />}
            </LightBox>
          ))}
        </Grid>
        {clickedBoxId !== nonClickedBoxId && (
          <AnimatePresence>
            <Overlay
              variants={overlayVariants}
              initial="inital"
              animate="animate"
              exit="exit"
              onClick={handleChangeSelectedBoxId(nonClickedBoxId)}
            >
              <Box layoutId={clickedBoxId.toString()}>
                {targetIndex === clickedBoxId && <Circle layoutId="circle" />}
              </Box>
            </Overlay>
          </AnimatePresence>
        )}
        <Button
          onClick={handleClickButton}
          variants={buttonVariants}
          animate={targetIndex === 1 ? 'default' : 'toggled'}
        >
          Switch
        </Button>
      </Slider>
    </Wrapper>
  );
};
