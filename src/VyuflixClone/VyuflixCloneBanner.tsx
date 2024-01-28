import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { IContents } from '../api';

interface BannerProps {
  content?: IContents;
}

const BannerContainer = styled.div`
  height: 60vw;
  max-height: 90vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 60px;
  z-index: 0;
`;

const ImageBox = styled.div<{ $bgPhoto: string }>`
  position: absolute;
  height: 100%;
  width: 75%;
  right: 0px;
  background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.75) 15%,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.25) 65%,
      rgba(0, 0, 0, 0.9) 100%
    ),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  z-index: -1;
`;

const InfoBox = styled.div`
  position: relative;
  left: 0;
  height: 100%;
  max-width: 30vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 1vw;
`;

const RateBox = styled.div`
  color: yellow;
  font-family: sans-serif;
  text-align: left;
  padding-top: 10vw;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 3vw;
  font-family: Serif;
`;

const Overview = styled.div`
  font-family: sans-serif;
  width: 100%;
  height: 30%;
  font-size: 2vmin;
`;

export const VyuflixCloneBanner = ({ content }: BannerProps) => {
  return content ? (
    <BannerContainer>
      <InfoBox>
        <RateBox>
          {'⭐'.repeat(parseInt(content.vote_average.toFixed(0)))}
        </RateBox>
        <Title>{content.title || content.name}</Title>
        <Overview>{content.overview ?? 'NO OVERVIEW'}</Overview>
      </InfoBox>
      <ImageBox $bgPhoto={makeImagePath(content.backdrop_path || '')} />
    </BannerContainer>
  ) : (
    <div></div>
  );
};
