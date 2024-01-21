import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import Coin from "./screens/Coin";
import Coins from "./screens/Coins";
import PriceChart from "./screens/PriceChart";
import Price from "./screens/Price";
import ChartOrPrice from "./screens/ChartOrPrice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <Coins /> },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          { index: true, element: <ChartOrPrice /> },
          {
            path: "price-chart",
            element: <PriceChart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
    ],
  },
]);

export default router;
