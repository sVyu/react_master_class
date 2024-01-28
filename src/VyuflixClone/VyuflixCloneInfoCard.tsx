import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { PathMatch } from 'react-router-dom';
import styled from 'styled-components';
import { IContents } from '../api';
import { makeImagePath } from '../utils';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  /* z-index: 1; */
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: '#2F2F2F';
  z-index: 2;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  z-index: 10000;
`;

const BigTitle = styled.h3`
  color: '#fff';
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: '#fff';
  z-index: 1000;
`;

interface InfoCardProps {
  patchMatch: PathMatch<'movieId'> | null;
  clickedContent: '' | IContents | undefined;
  handleClickOverlay: () => void;
}

export const VyuflixCloneInfoCard = ({
  patchMatch,
  clickedContent,
  handleClickOverlay,
}: InfoCardProps) => {
  const { scrollY } = useScroll();
  return (
    <AnimatePresence>
      {patchMatch && (
        <Overlay
          onClick={handleClickOverlay}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <BigMovie
            // style={{ top: scrollY.get() + 100 }}
            style={{ top: 100 }}
            layoutId={patchMatch.params.movieId}
          >
            {clickedContent && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedContent.backdrop_path,
                      'w500'
                    )})`,
                  }}
                />
                <BigTitle>{clickedContent.title}</BigTitle>
                <BigOverview>{clickedContent.overview}</BigOverview>
              </>
            )}
          </BigMovie>
        </Overlay>
      )}
    </AnimatePresence>
  );
};
