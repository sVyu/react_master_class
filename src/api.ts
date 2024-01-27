const BASE_URL = `https://api.coinpaprika.com/v1`;
const BASE_PATH = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((response) => response.json());
}

export interface IContents {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
}

export interface IGetContentsResult {
  page: number;
  results: IContents[];
  total_pages: number;
  total_results: number;
}

// export interface IGetSearchPersonResult {
//   page: number;
//   results: {
//     known_for: IContents[];
//   }[];
//   total_pages: number;
//   total_results: number;
// }

// Movies
export const getMoviesNowPlaying = () => {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

export const getMoviesPopular = () => {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

export const getMoviesTopRated = () => {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

export const getMoviesUpcoming = () => {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

// TVShows
export const getTVShowsOnTheAir = () => {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

export const getTVShowsAiringToday = () => {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

export const getTVShowsPopular = () => {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
};

export const getTVShowsTopRated = () => {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

// Search
export const getSearchMovies = (keyword: string) => {
  return fetch(
    `${BASE_PATH}/search/movie?query=${keyword}&api_key=${API_KEY}`
  ).then((response) => response.json());
};

export const getSearchTV = (keyword: string) => {
  return fetch(
    `${BASE_PATH}/search/tv?query=${keyword}&api_key=${API_KEY}`
  ).then((response) => response.json());
};

// export const getSearchPerson = (keyword: string) => {
//   return fetch(
//     `${BASE_PATH}/search/person?query=${keyword}&api_key=${API_KEY}&page=1`
//   ).then((response) => response.json());
// };
