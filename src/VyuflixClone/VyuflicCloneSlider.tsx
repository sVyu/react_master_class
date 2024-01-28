import { AnimatePresence, Variants, motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { PathMatch, useMatch, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { IContents, IGetContentsResult } from '../api';
import { VyuflixCloneInfoCard } from './VyuflixCloneInfoCard';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: blue;
  height: 200px;
`;

const Slider = styled.div`
  width: 90%;
  position: relative;
  height: 100%;
  background-color: black;
`;

const Row = styled(motion.div)<{ $offset: number }>`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(${(props) => props.$offset}, 1fr);
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const rowVariants: Variants = {
  hidden: ({ isGoingNext, offsetWidth }: buttonCustomProps) => ({
    x: isGoingNext ? -offsetWidth - 5 : offsetWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: ({ isGoingNext, offsetWidth }: buttonCustomProps) => ({
    x: isGoingNext ? offsetWidth + 5 : -offsetWidth - 5,
  }),
};

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  height: 100%;
  background-color: white;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  border-radius: 5px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const Info = styled(motion.div)`
  padding: 10px;
  background-color: #d1cdc0;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  color: black;
  border-radius: 5px;
  & > h4 {
    background-color: #cf7474;
    padding: 1px 5px 3px 5px;
    text-align: center;
    font-size: 16px;
    border-radius: 5px;
  }
`;

const ButtonContainer = styled.div`
  background-color: red;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
  z-index: 1;
`;

const Button = styled.button`
  background-color: transparent;
  border-radius: 50px;
  width: 3vw;
  height: 3vw;
  font-size: 2vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export interface ContentBoxHandlerProps {
  id: number;
  data: IContents[];
}

interface SliderProps {
  data: IContents[];
  offset: number;
  keyValue: string;
  handleClickContentBox: ({ id, data }: ContentBoxHandlerProps) => void;
}

interface buttonCustomProps {
  isGoingNext: boolean;
  offsetWidth: number;
}

export const VyuflixCloneSlider = ({
  data,
  offset,
  keyValue,
  handleClickContentBox,
}: SliderProps) => {
  const totalMovies = data.length - 1;
  const maxIndex = Math.floor(totalMovies / offset) - 1;

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const isGoingNextRef = useRef<boolean>(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleClickRightButton = () => {
    if (leaving) return;
    isGoingNextRef.current = true;
    toggleLeaving();
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const handleClickLeftButton = () => {
    if (leaving) return;
    isGoingNextRef.current = false;
    toggleLeaving();
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleClickBox =
    ({ id, data }: ContentBoxHandlerProps) =>
    () => {
      handleClickContentBox({ id, data });
    };

  const leftString = '<';
  const rightString = '>';

  return (
    <>
      <Container>
        <ButtonContainer>
          <Button onClick={handleClickLeftButton}>{leftString}</Button>
        </ButtonContainer>
        <Slider ref={sliderRef}>
          <AnimatePresence
            custom={{
              isGoingNext: isGoingNextRef.current,
              offsetWidth: sliderRef.current?.offsetWidth ?? 10,
            }}
            initial={false}
            onExitComplete={toggleLeaving}
          >
            <Row
              custom={{
                isGoingNext: isGoingNextRef.current,
                offsetWidth: sliderRef.current?.offsetWidth ?? 10,
              }}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'tween', duration: 1 }}
              key={keyValue + index}
              $offset={offset}
            >
              {data
                ?.slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <Box
                    layoutId={keyValue + movie.id + ''}
                    key={keyValue + movie.id}
                    whileHover="hover"
                    initial="normal"
                    variants={boxVariants}
                    onClick={handleClickBox({ id: movie.id, data })}
                    transition={{ type: 'tween' }}
                    $bgPhoto={makeImagePath(
                      movie.backdrop_path || movie.poster_path,
                      'w500'
                    )}
                  >
                    <Info variants={infoVariants}>
                      <h4>{movie.title || movie.name}</h4>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </Slider>
        <ButtonContainer>
          <Button onClick={handleClickRightButton}>{rightString}</Button>
        </ButtonContainer>
      </Container>
    </>
  );
};
