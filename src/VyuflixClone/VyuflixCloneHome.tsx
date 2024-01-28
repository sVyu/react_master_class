import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  IContents,
  IGetContentsResult,
  getMoviesNowPlaying,
  getMoviesPopular,
  getMoviesTopRated,
  getMoviesUpcoming,
} from '../api';
import { useNavigate, useMatch } from 'react-router-dom';
import {
  ContentBoxHandlerProps,
  VyuflixCloneSlider,
} from './VyuflicCloneSlider';
import { VyuflixCloneInfoCard } from './VyuflixCloneInfoCard';
import { useState } from 'react';
import { VyuflixCloneBanner } from './VyuflixCloneBanner';

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
  const handleClickContentData = ({ id, data }: ContentBoxHandlerProps) => {
    navigate(`movies/${id}`);
    setClickedContentData(data);
  };
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
          {/* <Banner
            $bgPhoto={makeImagePath(
              dataOfNowPlayingMovies?.results[0].backdrop_path || ''
            )}
          >
            <Title>{dataOfNowPlayingMovies?.results[0].title}</Title>
            <Overview>{dataOfNowPlayingMovies?.results[0].overview}</Overview>
          </Banner> */}
          <VyuflixCloneBanner content={dataOfNowPlayingMovies?.results[0]} />

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

          {bigMovieMatch && (
            <VyuflixCloneInfoCard
              key={Date.now()}
              patchMatch={bigMovieMatch}
              clickedContent={clickedContent}
              handleClickOverlay={handleClickOverlay}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};
