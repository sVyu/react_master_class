import { HashRouter, Route, Routes } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import { DefaultTheme } from 'styled-components/dist/types';
import ToDoList from './CategoryBoards/ToDoList';

interface RouterProps {
  theme?: DefaultTheme;
  onChangeTheme: () => void;
}

const Router = ({ theme, onChangeTheme }: RouterProps) => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/crypto_tracker_clone/:coinId/*" element={<Coin theme={theme} onChangeTheme={onChangeTheme} />} />
        <Route path="/crypto_tracker_clone" element={<Coins onChangeTheme={onChangeTheme} />} />
        <Route path="/category_boards" element={<ToDoList />} />
        <Route path="test" element={<div>test</div>} />
        <Route path="/" element={<div>coming soon !!!</div>} />
      </Routes>
    </HashRouter>
  );
};
export default Router;
