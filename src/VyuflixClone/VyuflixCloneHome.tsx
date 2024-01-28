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
import { Loader } from './Loader';
import { TitleStringBox } from './TitleStringBox';

const Wrapper = styled.div`
  background: black;
  width: 100vw;
  max-width: 100%;
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
        <Loader />
      ) : (
        <>
          <VyuflixCloneBanner content={dataOfNowPlayingMovies?.results[0]} />

          <TitleStringBox>◎ Now Playing</TitleStringBox>
          <VyuflixCloneSlider
            data={dataOfNowPlayingMovies?.results.slice(1) ?? []}
            offset={offset}
            keyValue={'NowPlayingMovies'}
            handleClickContentBox={handleClickContentData}
          />

          <TitleStringBox>◎ Popular movies</TitleStringBox>
          <VyuflixCloneSlider
            data={dataOfPopularMovies?.results ?? []}
            offset={offset}
            keyValue={'PopularMovies'}
            handleClickContentBox={handleClickContentData}
          />

          <TitleStringBox>◎ Top Rated Movies</TitleStringBox>
          <VyuflixCloneSlider
            data={dataOfTopRatedMovies?.results ?? []}
            offset={offset}
            keyValue={'TopRatedMovies'}
            handleClickContentBox={handleClickContentData}
          />

          <TitleStringBox>◎ Upcoming Movies</TitleStringBox>
          <VyuflixCloneSlider
            data={dataOfUpcomingMovies?.results ?? []}
            offset={offset}
            keyValue={'UpcomingMovies'}
            handleClickContentBox={handleClickContentData}
          />

          {bigMovieMatch && (
            <VyuflixCloneInfoCard
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
