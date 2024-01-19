import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/crypto_tracker_clone/:coinId">
          <Coin />
        </Route>
        <Route path="/crypto_tracker_clone/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
