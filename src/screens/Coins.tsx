import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useCoinsQuery } from "../api";
import { ICoin } from "../types/types";
import RotateIcon from "../components/RotateIcon";
import { Helmet } from "react-helmet";

const CoinsList = styled.ul`
  width: 100%;
  height: 100%;
  text-align: right;
`;

const CoinListItem = styled.li`
  background-color: ${(props) => props.theme.contentBoxColor};
  margin-top: 1rem;
  border-radius: 2rem;
  height: 3rem;
  width: 100%;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  & a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 2rem;
  }

  & img {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 1.5rem;
  }
`;

const CoinIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;

function Coins() {
  const queryClient = useQueryClient();
  const coinsQuery = useCoinsQuery();
  const coinsDataArray = coinsQuery.data?.data;
  const handleMouseOver = (coinId: string) => {
    const coinDataAndTimestamp = queryClient.getQueryData<{
      data: ICoin[];
      timestamp: number;
    }>(["assets"]);

    const coinData = coinDataAndTimestamp?.data.find(
      (coin) => coin.id === coinId
    );
    const timestamp = coinDataAndTimestamp?.timestamp;
    queryClient.setQueryData(["assets", coinId], { data: coinData, timestamp });
  };

  const invalidateCoinsData = () => {
    queryClient.invalidateQueries(["assets"], { exact: true });
  };
  const isFetching = coinsQuery.isFetching;

  return (
    <>
      {coinsQuery.status === "loading" ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Helmet>
            <title>Coins</title>
          </Helmet>
          <CoinsList>
            <RotateIcon
              $refreshing={isFetching}
              onClick={invalidateCoinsData}
            />
            {coinsDataArray?.map((coin) => (
              <CoinListItem key={coin.id}>
                <Link
                  to={`/${coin.id}`}
                  state={{ coinName: coin.name }}
                  onMouseOver={() => {
                    handleMouseOver(coin.id);
                  }}
                >
                  <CoinIcon
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  <span>{coin.name} &rarr; </span>
                </Link>
              </CoinListItem>
            ))}
          </CoinsList>
        </>
      )}
    </>
  );
}

export default Coins;
