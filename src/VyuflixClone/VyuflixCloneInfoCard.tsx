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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentCard = styled(motion.div)`
  position: relative;
  width: 50vw;
  max-width: 500px;
  min-width: 400px;
  height: 80vh;
  border-radius: 15px;
  border: 3px solid transparent;
  overflow: hidden;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(to right, red 0%, orange 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  display: flex;
  flex-direction: column;
`;

const BigCoverContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const RateBox = styled.div`
  position: absolute;
  color: yellow;
  bottom: 20px;
  right: 15px;
  /* background-color: rgba(0, 0, 0, 0.5); */
  border-radius: 5px;
  font-family: sans-serif;
`;

const BigTitle = styled.h3`
  position: absolute;
  color: '#fff';
  width: 75%;
  font-size: 5vmin;
  left: 25px;
  bottom: 15px;
  font-family: serif;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-image: linear-gradient(to right, red 0%, yellow 100%);
`;

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

const BigOverview = styled.p`
  flex-direction: column;
  width: 100%;
  text-align: center;
  background-color: black;
  padding: 20px;
  color: '#fff';
`;

interface InfoCardProps {
  patchMatch: PathMatch<string> | null;
  clickedContent: '' | IContents | undefined;
  handleClickOverlay: () => void;
}

export const VyuflixCloneInfoCard = ({
  patchMatch,
  clickedContent,
  handleClickOverlay,
}: InfoCardProps) => {
  return (
    <AnimatePresence>
      {patchMatch && (
        <Overlay
          onClick={handleClickOverlay}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ContentCard
            // style={{ top: 100 }}
            layoutId={patchMatch.params.movieId}
          >
            {clickedContent && (
              <>
                <BigCoverContainer
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedContent.backdrop_path,
                      'w500'
                    )})`,
                  }}
                >
                  <RateBox>
                    ⭐{clickedContent.vote_average.toFixed(1)} (
                    {clickedContent.vote_count})
                  </RateBox>
                  <BigTitle>{clickedContent.title}</BigTitle>
                </BigCoverContainer>
                <Line />
                <OverviewContainer>
                  <BigOverview>{clickedContent.overview}</BigOverview>
                </OverviewContainer>
              </>
            )}
          </ContentCard>
        </Overlay>
      )}
    </AnimatePresence>
  );
};
