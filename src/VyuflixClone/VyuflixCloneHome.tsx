import { useQuery } from 'react-query';
import styled from 'styled-components';
import { motion, useScroll } from 'framer-motion';
import {
  IContents,
  IGetContentsResult,
  getMoviesNowPlaying,
  getMoviesPopular,
  getMoviesTopRated,
  getMoviesUpcoming,
} from '../api';
import { makeImagePath } from '../utils';
import { useNavigate, useMatch } from 'react-router-dom';
import { VyuflixCloneSlider } from './VyuflicCloneSlider';
import { VyuflixCloneInfoCard } from './VyuflixCloneInfoCard';
import { useState } from 'react';
import { set } from 'react-hook-form';

const Wrapper = styled.div`
  background: black;
  width: 100vw;
  max-width: 100%;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const offset = 6;

export const VyuflixCloneHome = () => {
  const navigate = useNavigate();
  const [clicedContentData, setClickedContentData] = useState<IContents[]>([]);
  const { data: dataOfNowPlayingMovies, isLoading: loaindgOfNowPlayingMovies } =
    useQuery<IGetContentsResult>(['movies', 'nowPlaying'], getMoviesNowPlaying);
  const { data: dataOfPopularMovies, isLoading: loadingOfLatestMovies } =
    useQuery<IGetContentsResult>(['movies', 'popular'], getMoviesPopular);
  const { data: dataOfTopRatedMovies, isLoading: loadingOfTopRatedMovies } =
    useQuery<IGetContentsResult>(['movies', 'topRated'], getMoviesTopRated);
  const { data: dataOfUpcomingMovies, isLoading: loadingOfUpcomingMovies } =
    useQuery<IGetContentsResult>(['movies', 'upcoming'], getMoviesUpcoming);

  const bigMovieMatch = useMatch('/vyuflix_clone/movies/:movieId');
  const clickedContent =
    bigMovieMatch?.params.movieId &&
    clicedContentData?.find(
      (content) =>
        content.id.toString() === bigMovieMatch.params.movieId?.toString()
    );
  const handleClickContentData = (data: IContents[]) =>
    setClickedContentData(data);
  const handleClickOverlay = () => navigate('/vyuflix_clone');

  return (
    <Wrapper>
      {loaindgOfNowPlayingMovies ||
      loadingOfLatestMovies ||
      loadingOfTopRatedMovies ||
      loadingOfUpcomingMovies ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(
              dataOfNowPlayingMovies?.results[0].backdrop_path || ''
            )}
          >
            <Title>{dataOfNowPlayingMovies?.results[0].title}</Title>
            <Overview>{dataOfNowPlayingMovies?.results[0].overview}</Overview>
          </Banner>

          <div>nowPlaying</div>
          <VyuflixCloneSlider
            data={dataOfNowPlayingMovies?.results.slice(1) ?? []}
            offset={offset}
            keyValue={'NowPlayingMovies'}
            handleClickContentBox={handleClickContentData}
          />

          <div>Popular movies</div>
          <VyuflixCloneSlider
            data={dataOfPopularMovies?.results ?? []}
            offset={offset}
            keyValue={'PopularMovies'}
            handleClickContentBox={handleClickContentData}
          />

          <div>Top Rated Movies</div>
          <VyuflixCloneSlider
            data={dataOfTopRatedMovies?.results ?? []}
            offset={offset}
            keyValue={'TopRatedMovies'}
            handleClickContentBox={handleClickContentData}
          />

          <div>Upcoming Movies</div>
          <VyuflixCloneSlider
            data={dataOfUpcomingMovies?.results ?? []}
            offset={offset}
            keyValue={'UpcomingMovies'}
            handleClickContentBox={handleClickContentData}
          />

          <VyuflixCloneInfoCard
            patchMatch={bigMovieMatch}
            clickedContent={clickedContent}
            handleClickOverlay={handleClickOverlay}
          />
        </>
      )}
    </Wrapper>
  );
};
