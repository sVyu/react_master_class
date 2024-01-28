import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { IContents } from '../api';

interface BannerProps {
  content?: IContents;
}

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

export const VyuflixCloneBanner = ({ content }: BannerProps) => {
  console.log('content', content);

  return content ? (
    <Banner $bgPhoto={makeImagePath(content.backdrop_path || '')}>
      <Title>{content.title}</Title>
      <Overview>{content.overview}</Overview>
    </Banner>
  ) : (
    <div></div>
  );
};
