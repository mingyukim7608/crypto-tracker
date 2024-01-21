import { useQuery } from "@tanstack/react-query";
import { ICoin, ICoinHistory } from "./types/types";

export function useCoinsQuery() {
  return useQuery<{ data: ICoin[]; timestamp: number }, Error>({
    queryKey: ["assets"] as const,
    queryFn: async function () {
      const response = await fetch("https://api.coincap.io/v2/assets", {
        headers: {
          Authorization: "Bearer 70f83560-d15f-4a11-b8ef-a9772bc5136d",
        },
      });
      if (!response.ok) {
        throw new Error("Could not fetch coins data.");
      }

      const json: { data: ICoin[]; timestamp: number } = await response.json();
      json.data.forEach((coin) => {});
      return json;
    },
  });
}

export function useCoinQuery(coinId: string) {
  return useQuery({
    queryKey: ["assets", coinId] as const,
    queryFn: async () => {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${coinId}`,
        {
          headers: {
            Authorization: "Bearer 70f83560-d15f-4a11-b8ef-a9772bc5136d",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Could not fetch coin data. Coin ID: ${coinId}`);
      }

      const json: { data: ICoin; timestamp: number } = await response.json();
      return json;
    },
    refetchInterval: 1000 * 60,
  });
}

export async function fetchCoin(coinId: string) {
  const response = await fetch(`https://api.coincap.io/v2/assets/${coinId}`, {
    headers: {
      Authorization: "Bearer 70f83560-d15f-4a11-b8ef-a9772bc5136d",
    },
  });
  if (!response.ok) {
    throw new Error(`Could not fetch coin data. Coin ID: ${coinId}`);
  }

  const json: { data: ICoin; timestamp: number } = await response.json();
  return json;
}

export function useCoinHistoryQuery(coinId: string) {
  return useQuery({
    queryKey: ["assets", coinId, "history"],
    queryFn: async () => {
      const now = Date.now();
      const anYearAgo = now - 1000 * 60 * 60 * 24 * 30 * 12;
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${coinId}/history?interval=d1&start=${anYearAgo}&end=${now}`
      );
      if (!response.ok) {
        throw new Error(`Could not fetch coin candels. coin ID: ${coinId}`);
      }
      const json: { data: ICoinHistory[]; timestamp: number } =
        await response.json();
      return json;
    },
  });
}

export async function fetchHistory(coinId: string) {
  const now = Date.now();
  const anYearAgo = now - 1000 * 60 * 60 * 24 * 30 * 12;
  const response = await fetch(
    `https://api.coincap.io/v2/assets/${coinId}/history?interval=d1&start=${anYearAgo}&end=${now}`
  );
  if (!response.ok) {
    throw new Error(`Could not fetch coin candels. coin ID: ${coinId}`);
  }
  const json: { data: ICoinHistory[]; timestamp: number } =
    await response.json();

  return json;
}
