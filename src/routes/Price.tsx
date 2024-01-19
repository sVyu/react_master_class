import styled from 'styled-components';
import { PriceData } from './Coin';

interface PriceProps {
  tickersData?: PriceData;
}

const PriceBlock = styled.div`
  background-color: ${(props) => props.theme.blockColor};
  min-height: 20vh;
  padding: 20px 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const PriceTextRow = styled.span``;

export const Price = ({ tickersData }: PriceProps) => {
  return (
    <PriceBlock>
      <PriceTextRow>
        ath_price : ${tickersData?.quotes.USD.ath_price.toFixed(3)}
      </PriceTextRow>
      <PriceTextRow>ath_date: {tickersData?.quotes.USD.ath_date}</PriceTextRow>
      <PriceTextRow>last_updated: {tickersData?.last_updated}</PriceTextRow>
      <PriceTextRow>
        percent_from_price_ath :{' '}
        {tickersData?.quotes.USD.percent_from_price_ath}
      </PriceTextRow>
    </PriceBlock>
  );
};
