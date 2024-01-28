import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  IContents,
  IGetContentsResult,
  getTVShowsAiringToday,
  getTVShowsOnTheAir,
  getTVShowsPopular,
  getTVShowsTopRated,
} from '../api';
import {
  ContentBoxHandlerProps,
  VyuflixCloneSlider,
} from './VyuflicCloneSlider';
import { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { VyuflixCloneInfoCard } from './VyuflixCloneInfoCard';
import { VyuflixCloneBanner } from './VyuflixCloneBanner';
import { Loader } from './Loader';

const Container = styled.div`
  width: 100%;
  background-color: black;
`;

const offset = 4;

export const VyuflixCloneTV = () => {
  const navigate = useNavigate();
  const [clicedContentData, setClickedContentData] = useState<IContents[]>([]);
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

  const tvMatch = useMatch('/vyuflix_clone/tv/:tvId');
  const clickedContent =
    tvMatch?.params.tvId &&
    clicedContentData?.find(
      (content) => content.id.toString() === tvMatch.params.tvId?.toString()
    );

  const handleClickContentData = ({ id, data }: ContentBoxHandlerProps) => {
    navigate(`/vyuflix_clone/tv/${id}`);
    setClickedContentData(data);
  };

  const handleClickOverlay = () => navigate('/vyuflix_clone/tv');

  return (
    <Container>
      {isLoadingOfOnTheAirTVShows &&
      isLoadingOfAiringTodayTVShows &&
      isLoadingOfPopularTVShows &&
      isLoadingOfTopRatedTVShows ? (
        <Loader />
      ) : (
        <>
          <VyuflixCloneBanner content={dataOfAiringTodayTVShows?.results[0]} />
          <div>OnTheAir</div>
          <VyuflixCloneSlider
            data={dataOfOnTheAirTVShows?.results.slice(1) ?? []}
            offset={offset}
            keyValue={'OnTheAirTVShows'}
            handleClickContentBox={handleClickContentData}
          />
          <div>AiringToday</div>
          <VyuflixCloneSlider
            data={dataOfAiringTodayTVShows?.results ?? []}
            offset={offset}
            keyValue={'AiringToday'}
            handleClickContentBox={handleClickContentData}
          />
          <div>Popular</div>
          <VyuflixCloneSlider
            data={dataOfPopularTVShows?.results ?? []}
            offset={offset}
            keyValue={'Popular'}
            handleClickContentBox={handleClickContentData}
          />
          <div>TopRated</div>
          <VyuflixCloneSlider
            data={dataOfTopRatedTVShows?.results ?? []}
            offset={offset}
            keyValue={'Toprated'}
            handleClickContentBox={handleClickContentData}
          />
          {tvMatch && (
            <VyuflixCloneInfoCard
              patchMatch={tvMatch}
              clickedContent={clickedContent}
              handleClickOverlay={handleClickOverlay}
            />
          )}
        </>
      )}
    </Container>
  );
};
