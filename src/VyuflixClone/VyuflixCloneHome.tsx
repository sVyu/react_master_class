import { useQuery } from 'react-query';
import styled from 'styled-components';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import {
  IGetContentsResult,
  getMoviesNowPlaying,
  getMoviesPopular,
  getMoviesTopRated,
  getMoviesUpcoming,
} from '../api';
import { makeImagePath } from '../utils';
import { useNavigate, useMatch } from 'react-router-dom';
import { VyuflixCloneSlider } from './VyuflicCloneSlider';

const Wrapper = styled.div`
  background: black;
  /* padding-bottom: 200px; */
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: '#2F2F2F';
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: '#fff';
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: '#fff';
`;

const offset = 6;

export const VyuflixCloneHome = () => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch('/vyuflix_clone/movies/:movieId');
  const { scrollY } = useScroll();
  const { data: dataOfNowPlayingMovies, isLoading: loaindgOfNowPlayingMovies } =
    useQuery<IGetContentsResult>(['movies', 'nowPlaying'], getMoviesNowPlaying);
  const { data: dataOfPopularMovies, isLoading: loadingOfLatestMovies } =
    useQuery<IGetContentsResult>(['movies', 'popular'], getMoviesPopular);
  const { data: dataOfTopRatedMovies, isLoading: loadingOfTopRatedMovies } =
    useQuery<IGetContentsResult>(['movies', 'topRated'], getMoviesTopRated);
  const { data: dataOfUpcomingMovies, isLoading: loadingOfUpcomingMovies } =
    useQuery<IGetContentsResult>(['movies', 'upcoming'], getMoviesUpcoming);

  const onOverlayClick = () => navigate('/vyuflix_clone');
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    dataOfNowPlayingMovies?.results.find(
      (movie) =>
        movie.id.toString() === bigMovieMatch.params.movieId?.toString()
    );
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
          />

          <div>Popular movies</div>
          <VyuflixCloneSlider
            data={dataOfPopularMovies?.results ?? []}
            offset={offset}
            keyValue={'PopularMovies'}
          />

          <div>Top Rated Movies</div>
          <VyuflixCloneSlider
            data={dataOfTopRatedMovies?.results ?? []}
            offset={offset}
            keyValue={'TopRatedMovies'}
          />

          <div>Upcoming Movies</div>
          <VyuflixCloneSlider
            data={dataOfUpcomingMovies?.results ?? []}
            offset={offset}
            keyValue={'UpcomingMovies'}
          />

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            'w500'
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};
