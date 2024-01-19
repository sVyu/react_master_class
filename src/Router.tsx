import { HashRouter, Route, Routes } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import { DefaultTheme } from 'styled-components/dist/types';

interface RouterProps {
  theme?: DefaultTheme;
  onChangeTheme: () => void;
}

const Router = ({ theme, onChangeTheme }: RouterProps) => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/crypto_tracker_clone/:coinId/*"
          element={<Coin theme={theme} onChangeTheme={onChangeTheme} />}
        ></Route>
        <Route
          path="/crypto_tracker_clone"
          element={<Coins onChangeTheme={onChangeTheme} />}
        ></Route>
        <Route path="test" element={<div>test</div>}></Route>
        <Route path="/" element={<div>coming soon !!!</div>}></Route>
      </Routes>
    </HashRouter>
  );
};
export default Router;
