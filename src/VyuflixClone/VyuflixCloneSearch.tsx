import { useLocation } from 'react-router';
import { IGetContentsResult, getSearchMovies, getSearchTV } from '../api';
import { useQuery } from 'react-query';
import { VyuflixCloneSlider } from './VyuflicCloneSlider';

const offset = 4;
export const VyuflixCloneSearch = () => {
  const location = useLocation();
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

  return (
    <>
      <div>Movies</div>
      <VyuflixCloneSlider
        data={dataOfSearchMovies?.results ?? []}
        offset={offset}
        keyValue={'SearchMovies'}
      />
      <div>TV</div>
      <VyuflixCloneSlider
        data={dataOfSearchTV?.results ?? []}
        offset={offset}
        keyValue={'SearchTV'}
      />
    </>
  );
};
