import { useCoinQuery } from "../api";
import { CoinContent } from "../components/CoinContent";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

function Price() {
  const coinId = useParams().coinId as string;
  const coinQuery = useCoinQuery(coinId);
  if (coinQuery.status === "loading") {
    return <Loading>Loading...</Loading>;
  }
  const coinData = coinQuery.data!.data;
  return (
    <>
      <CoinContent
        contents={[
          {
            title: "Max Supply",
            info: coinData.maxSupply
              ? Number(coinData.maxSupply).toFixed(2)
              : "Not available",
          },
          {
            title: "Market Cap(USD)",
            info: coinData.marketCapUsd
              ? Number(coinData.marketCapUsd).toFixed(2)
              : "Not available",
          },
        ]}
      />
      <CoinContent
        contents={[
          {
            title: "Volume 24h (USD)",
            info: coinData.volumeUsd24Hr
              ? Number(coinData.volumeUsd24Hr).toFixed(2)
              : "Not available",
          },
          {
            title: "VWAP 24h (USD)",
            info: coinData.vwap24Hr
              ? Number(coinData.vwap24Hr).toFixed(2)
              : "Not available",
          },
        ]}
      />
    </>
  );
}

export default Price;
