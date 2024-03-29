import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { Chart } from './Chart';
import { defaultStaleTime } from '../utils';
import { Price } from './Price';
import { DefaultTheme } from 'styled-components';
import { ToggleThemeButton } from './Coins';
import { useMatch } from 'react-router-dom';

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.blockColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.blockColor};
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;

const GoToCoinsPageButton = styled.button`
  position: absolute;
  top: 10px;
  left: 0px;
  background-color: transparent;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 40px;
  height: 25px;
  & > a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface RouteParams {
  coinId: string;
}
// interface RouteState {
//   name: string;
// }
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface CoinProps {
  theme?: DefaultTheme;
  onChangeTheme: () => void;
}

export const Coin = ({ theme, onChangeTheme }: CoinProps) => {
  const { coinId } = useParams() as unknown as RouteParams;
  const { state } = useLocation();
  const priceMatch = useMatch('/crypto_tracker_clone/:coinId/price');
  const chartMatch = useMatch('/crypto_tracker_clone/:coinId/chart');

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId),
    { staleTime: defaultStaleTime }
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
    { staleTime: defaultStaleTime }
  );

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </Title>
        <ToggleThemeButton onClick={onChangeTheme}>
          toggleTheme
        </ToggleThemeButton>
        <GoToCoinsPageButton>
          <Link
            to={{
              pathname: `/crypto_tracker_clone`,
            }}
          >
            ←
          </Link>
        </GoToCoinsPageButton>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link
                to={`/crypto_tracker_clone/${coinId}/chart`}
                state={{ coinId: coinId }}
              >
                Chart
              </Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link
                to={`/crypto_tracker_clone/${coinId}/price`}
                state={{ coinId: coinId }}
              >
                Price
              </Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path={`chart`} element={<Chart theme={theme} />}></Route>
            <Route
              path={`price`}
              element={<Price tickersData={tickersData} />}
            ></Route>
          </Routes>
        </>
      )}
    </Container>
  );
};
export default Coin;
