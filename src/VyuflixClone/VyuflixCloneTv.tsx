import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  IGetContentsResult,
  getTVShowsAiringToday,
  getTVShowsOnTheAir,
  getTVShowsPopular,
  getTVShowsTopRated,
} from '../api';
import { VyuflixCloneSlider } from './VyuflicCloneSlider';

const Container = styled.div`
  width: 100%;
`;

const offset = 4;

export const VyuflixCloneTV = () => {
  const { data: dataOfOnTheAirTVShows, isLoading: isLoadingOfOnTheAirTVShows } =
    useQuery<IGetContentsResult>(['tvShows', 'onTheAir'], getTVShowsOnTheAir);
  const {
    data: dataOfAiringTodayTVShows,
    isLoading: isLoadingOfAiringTodayTVShows,
  } = useQuery<IGetContentsResult>(
    ['tvShows', 'airingToday'],
    getTVShowsAiringToday
  );
  const { data: dataOfPopularTVShows, isLoading: isLoadingOfPopularTVShows } =
    useQuery<IGetContentsResult>(['tvShows', 'popular'], getTVShowsPopular);

  const { data: dataOfTopRatedTVShows, isLoading: isLoadingOfTopRatedTVShows } =
    useQuery<IGetContentsResult>(['tvShows', 'topRated'], getTVShowsTopRated);

  return (
    <Container>
      <div>OnTheAir</div>
      <VyuflixCloneSlider
        data={dataOfOnTheAirTVShows?.results ?? []}
        offset={offset}
        keyValue={'OnTheAirTVShows'}
      />
      <div>AiringToday</div>
      <VyuflixCloneSlider
        data={dataOfAiringTodayTVShows?.results ?? []}
        offset={offset}
        keyValue={'AiringToday'}
      />
      <div>Popular</div>
      <VyuflixCloneSlider
        data={dataOfPopularTVShows?.results ?? []}
        offset={offset}
        keyValue={'Popular'}
      />
      <div>TopRated</div>
      <VyuflixCloneSlider
        data={dataOfTopRatedTVShows?.results ?? []}
        offset={offset}
        keyValue={'Toprated'}
      />
    </Container>
  );
};
