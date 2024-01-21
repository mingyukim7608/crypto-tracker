import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { useParams, Outlet, NavLink } from "react-router-dom";
import Loading from "../components/Loading";
import { useCoinQuery, fetchHistory } from "../api";
import RotateIcon from "../components/RotateIcon";
import { Helmet } from "react-helmet";
import { CoinContentBox } from "../components/CoinContentBox";
import { CoinContent } from "../components/CoinContent";

const CoinTitle = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 2rem;
  margin-bottom: 3rem;
  display: inline;
`;

const CoinContentsContainer = styled.div`
  width: 100%;
`;

const ChartOrPriceSpan = styled.span`
  width: 8rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  transition: all 0.2s ease-in-out;

  &.chosen {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.accentColor};
  }
`;

function Coin() {
  const coinId = useParams().coinId as string;
  const coinQuery = useCoinQuery(coinId);
  const coinData = coinQuery.data?.data;
  const queryClient = useQueryClient();

  const handleChartMouseOver = () => {
    queryClient.prefetchQuery({
      queryKey: ["assets", coinId, "history"],
      queryFn: () => fetchHistory(coinId),
    });
  };

  const invalidateCoinData = () => {
    queryClient.invalidateQueries(["assets", coinId]);
  };

  const refreshing = coinQuery.isFetching;

  return (
    <>
      <Helmet>
        <title>{coinData?.name}</title>
      </Helmet>
      <CoinTitle>
        {coinQuery.status === "loading" ? "" : coinData?.name + " "}
      </CoinTitle>
      <RotateIcon $refreshing={refreshing} onClick={invalidateCoinData} />
      <CoinContentsContainer>
        {coinQuery.status === "loading" ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <CoinContent
              contents={[
                { title: "Name", info: coinData!.name },
                { title: "Symbol", info: coinData!.symbol },
                { title: "Rank", info: coinData!.rank.toString() },
              ]}
            />
            <CoinContent
              contents={[
                {
                  title: "Price(USD)",
                  info: Number(coinData!.priceUsd).toFixed(2),
                },
                {
                  title: "Change(24h)",
                  info: Number(coinData!.changePercent24Hr).toFixed(2),
                },
                { title: "Supply", info: Number(coinData!.supply).toFixed(2) },
              ]}
            />
            <CoinContentBox>
              <NavLink to="price-chart" onMouseOver={handleChartMouseOver}>
                {({ isActive, isPending }) => (
                  <ChartOrPriceSpan
                    className={isActive || isPending ? "chosen" : ""}
                  >
                    Chart
                  </ChartOrPriceSpan>
                )}
              </NavLink>
              <NavLink to="price">
                {({ isActive, isPending }) => (
                  <ChartOrPriceSpan
                    className={isActive || isPending ? "chosen" : ""}
                  >
                    Price
                  </ChartOrPriceSpan>
                )}
              </NavLink>
            </CoinContentBox>

            <Outlet />
          </>
        )}
      </CoinContentsContainer>
    </>
  );
}

export default Coin;
