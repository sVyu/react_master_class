import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface RouterProps {
  onChangeTheme: () => void;
}

const Router = ({ onChangeTheme }: RouterProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/crypto_tracker_clone/:coinId">
          <Coin onChangeTheme={onChangeTheme} />
        </Route>
        <Route path="/crypto_tracker_clone">
          <Coins onChangeTheme={onChangeTheme} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
