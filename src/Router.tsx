import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import { DefaultTheme } from 'styled-components/dist/types';

interface RouterProps {
  theme?: DefaultTheme;
  onChangeTheme: () => void;
}

const Router = ({ theme, onChangeTheme }: RouterProps) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/react_master_class/crypto_tracker_clone/:coinId">
          <Coin theme={theme} onChangeTheme={onChangeTheme} />
        </Route>
        <Route path="/react_master_class/crypto_tracker_clone">
          <Coins onChangeTheme={onChangeTheme} />
        </Route>
        <Route path="/react_master_class/hmm/">
          <div>hmm</div>
        </Route>
        <Route path="/react_master_class">
          <div>page test ..!!</div>
        </Route>
        <Route path="/">
          <div>root test</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
