import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import { VyuflixCloneHome } from './VyuflixCloneHome';

export const VyuflixCloneRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        {['/', 'movies/:movieId'].map((path, index) => (
          <Route path={path} element={<VyuflixCloneHome />} key={index} />
        ))}
      </Routes>
    </>
  );
};
