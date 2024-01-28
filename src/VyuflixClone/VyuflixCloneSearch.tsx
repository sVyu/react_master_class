import { useLocation } from 'react-router';
import { IGetContentsResult, getSearchMovies, getSearchTV } from '../api';
import { useQuery } from 'react-query';
import {
  ContentBoxHandlerProps,
  VyuflixCloneSlider,
} from './VyuflicCloneSlider';
import { useMatch, useNavigate } from 'react-router-dom';
import { VyuflixCloneInfoCard } from './VyuflixCloneInfoCard';
import { VyuflixCloneBanner } from './VyuflixCloneBanner';
import styled from 'styled-components';
import { Loader } from './Loader';

const Container = styled.div`
  width: 100%;
  background-color: black;
`;

const offset = 4;
export const VyuflixCloneSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const { data: dataOfSearchMovies, isLoading: isLoadingOfSearchMovies } =
    useQuery<IGetContentsResult>(['Search', 'Movies'], () =>
      getSearchMovies(keyword ?? '')
    );
  const { data: dataOfSearchTV, isLoading: isLoadingOfSearchTV } =
    useQuery<IGetContentsResult>(['Search', 'TV'], () =>
      getSearchTV(keyword ?? '')
    );
  // const { data: dataOfSearchPerson, isLoading: isLoadingOfSearchPerson } =
  //   useQuery<IGetSearchPersonResult>(['Search', 'Person'], () =>
  //     getSearchPerson(keyword ?? '')
  //   );

  const searchMoviesMatch = useMatch(`/vyuflix_clone/search/movies/:movieId`);
  const searchTVMatch = useMatch(`/vyuflix_clone/search/TV/:tvId`);
  const clickedMovieContent =
    searchMoviesMatch?.params.movieId &&
    dataOfSearchMovies?.results?.find(
      (content) =>
        content.id.toString() === searchMoviesMatch.params.movieId?.toString()
    );
  const clickedTVContent =
    searchTVMatch?.params.tvId &&
    dataOfSearchTV?.results?.find(
      (content) =>
        content.id.toString() === searchTVMatch.params.tvId?.toString()
    );
  const handleClickMovieData = ({ id, data }: ContentBoxHandlerProps) => {
    navigate(`/vyuflix_clone/search/movies/${id}`);
  };
  const handleClickTVData = ({ id, data }: ContentBoxHandlerProps) => {
    navigate(`/vyuflix_clone/search/tv/${id}`);
  };
  const handleClickOverlay = () =>
    navigate(`/vyuflix_clone/search?keyword=${keyword}`);

  return (
    <Container>
      {isLoadingOfSearchMovies || isLoadingOfSearchTV ? (
        <Loader />
      ) : (
        <>
          <VyuflixCloneBanner content={dataOfSearchMovies?.results[0]} />

          <div>Searched Movies</div>
          <VyuflixCloneSlider
            data={dataOfSearchMovies?.results.slice(0) ?? []}
            offset={offset}
            keyValue={'SearchMovies'}
            handleClickContentBox={handleClickMovieData}
          />
          <div>Searched TV</div>
          <VyuflixCloneSlider
            data={dataOfSearchTV?.results ?? []}
            offset={offset}
            keyValue={'SearchTV'}
            handleClickContentBox={handleClickTVData}
          />

          {searchMoviesMatch && (
            <VyuflixCloneInfoCard
              patchMatch={searchMoviesMatch}
              clickedContent={clickedMovieContent}
              handleClickOverlay={handleClickOverlay}
            />
          )}
          {searchTVMatch && (
            <VyuflixCloneInfoCard
              patchMatch={searchTVMatch}
              clickedContent={clickedTVContent}
              handleClickOverlay={handleClickOverlay}
            />
          )}
        </>
      )}
    </Container>
  );
};
