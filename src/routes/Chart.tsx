import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { defaultStaleTime } from '../utils';
import { DefaultTheme } from 'styled-components';
import { WhiteTheme } from '../theme';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  theme?: DefaultTheme;
  coinId: string;
}
export const Chart = ({ theme, coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    { staleTime: defaultStaleTime }
  );

  return (
    <div>
      {!data || isLoading ? (
        <div>'Loading chart...'</div>
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                return {
                  x: price.time_open,
                  y: [price.open, price.high, price.low, price.close],
                };
              }),
            },
          ]}
          options={{
            theme: { mode: theme === WhiteTheme ? 'light' : 'dark' },
            chart: {
              type: 'candlestick',
              height: 350,
            },
            title: {
              text: 'CandleStick Chart',
              align: 'left',
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};
