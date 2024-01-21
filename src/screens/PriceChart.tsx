import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCoinHistoryQuery } from "../api";
import Chart from "react-apexcharts";
import Loading from "../components/Loading";
import RotateIcon from "../components/RotateIcon";
import { useTheme } from "styled-components";

function PriceChart() {
  const coinId = useParams().coinId as string;
  const historyQuery = useCoinHistoryQuery(coinId);
  const queryClient = useQueryClient();
  const theme = useTheme();

  if (historyQuery.isLoading) {
    return <Loading>Loading...</Loading>;
  }

  const invalidateCoinHistoryData = () => {
    queryClient.invalidateQueries(["assets", coinId, "history"]);
  };

  const isFetching = historyQuery.isFetching;

  const priceDataArray = historyQuery.data!.data;
  const dateAndPriceArray = priceDataArray.map((data) => [
    data.time,
    data.priceUsd,
  ]);

  const options = {
    chart: {
      fontFamily: "Ubuntu",
      foreColor: theme.textColor,
      animations: {
        enabled: true,
        easing: "easeinout",
        animateGradually: {
          enabled: true,
        },
        dynamicAnimation: {
          enabled: true,
        },
        selection: {
          enabled: true,
        },
      },
      zoom: {
        enabled: true,
        autoScaleYaxis: true,
      },
    },
    xaxis: {
      type: "datetime",
      tickPlacement: "on",
      crosshairs: {
        show: true,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => {
          return "$ " + Math.floor(value).toString();
        },
        style: {
          colors: theme.textColor,
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: theme.themeName === "dark" ? "dark" : "light",
      x: {
        format: "yyyy/MM/dd",
      },
      y: {
        title: {
          formatter: () => "",
        },
      },
      marker: {
        show: false,
      },
    },
    toolbar: {
      tools: {
        selection: true,
      },
    },
    stroke: {
      colors: [theme.accentColor] as string[],
      width: 2,
    },
  } as const;

  return (
    <>
      <RotateIcon
        $refreshing={isFetching}
        onClick={invalidateCoinHistoryData}
      />
      <Chart
        series={[{ name: coinId, data: dateAndPriceArray }]}
        type="line"
        options={options}
      />
    </>
  );
}

export default PriceChart;
