import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import { VyuflixCloneHome } from './VyuflixCloneHome';
import { DarkTheme } from '../theme';
import { DefaultTheme } from 'styled-components/dist/types';
import { VyuflixCloneTV } from './VyuflixCloneTv';
import { VyuflixCloneSearch } from './VyuflixCloneSearch';
import { Footer } from '../Footer';
import { useState } from 'react';

interface RouterProps {
  theme?: DefaultTheme;
  onChangeTheme: () => void;
}

export const VyuflixCloneRouter = ({ theme, onChangeTheme }: RouterProps) => {
  // ToDo: theme refactoring
  if (theme !== DarkTheme) onChangeTheme();

  // for SearchPage Re-rendering
  const [key, setKey] = useState('');
  const handleSetKey = (value: string) => setKey(value);

  return (
    <>
      <Header />
      <Routes>
        <Route path="tv/*" element={<VyuflixCloneTV />} />
        <Route
          path="search/*"
          element={<VyuflixCloneSearch key={key} handleSetKey={handleSetKey} />}
        />
        {['/', 'movies/:movieId'].map((path, index) => (
          <Route path={path} element={<VyuflixCloneHome />} key={index} />
        ))}
      </Routes>
      <Footer />
    </>
  );
};
