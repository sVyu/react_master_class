import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import { VyuflixCloneHome } from './VyuflixCloneHome';
import { DarkTheme } from '../theme';
import { DefaultTheme } from 'styled-components/dist/types';

interface RouterProps {
  theme?: DefaultTheme;
  onChangeTheme: () => void;
}

export const VyuflixCloneRouter = ({ theme, onChangeTheme }: RouterProps) => {
  // ToDo: theme refactoring
  if (theme !== DarkTheme) onChangeTheme();
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
