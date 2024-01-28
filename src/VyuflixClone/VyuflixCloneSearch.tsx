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
  const urlLocation = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(urlLocation.search).get('keyword');

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

  const searchMoviesMatch = useMatch(`/vyuflix_clone/search/movies/:movieId/*`);
  const searchTVMatch = useMatch(`/vyuflix_clone/search/TV/:tvId/*`);
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
    navigate(`/vyuflix_clone/search/movies/${id}/search?keyword=${keyword}`);
  };
  const handleClickTVData = ({ id, data }: ContentBoxHandlerProps) => {
    navigate(`/vyuflix_clone/search/tv/${id}/search?keyword=${keyword}`);
  };
  const handleClickOverlay = () =>
    navigate(`/vyuflix_clone/search?keyword=${keyword}`);

  // useEffect(() => {
  //   window.history(`search?keyword=${keyword}`);
  //   // location.reload(`);
  // }, [keyword]);

  return (
    <>
      {isLoadingOfSearchMovies && isLoadingOfSearchTV ? (
        <Loader />
      ) : (
        <Container>
          <VyuflixCloneBanner content={dataOfSearchMovies?.results[0]} />

          <div>Searched Movies</div>
          <VyuflixCloneSlider
            data={dataOfSearchMovies?.results.slice(1) ?? []}
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
              key={searchMoviesMatch.params.movieId}
              patchMatch={searchMoviesMatch}
              clickedContent={clickedMovieContent}
              handleClickOverlay={handleClickOverlay}
            />
          )}
          {searchTVMatch && (
            <VyuflixCloneInfoCard
              key={searchTVMatch.params.tvId}
              patchMatch={searchTVMatch}
              clickedContent={clickedTVContent}
              handleClickOverlay={handleClickOverlay}
            />
          )}
        </Container>
      )}
    </>
  );
};
