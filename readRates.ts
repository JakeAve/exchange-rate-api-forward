import { load } from "$std/dotenv/mod.ts";

const env = await load();
const API_KEY = env["EXCHANGE_RATE_API_KEY"];
const EXCHANGE_RATE_API = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

interface ExchangeRateApiResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: {
    [key: string]: number;
  };
}

export async function readRates() {
  const eurRes = await fetch(`${EXCHANGE_RATE_API}/latest/EUR`);
  const eurObj = (await eurRes.json()) as ExchangeRateApiResponse;

  const { conversion_rates: rates, time_last_update_unix: updatedAt } = eurObj;

  // get the list of possible currencies
  const currencies = Object.keys(rates);

  const conversions: Record<string, number> = {};

  for (const c1 of currencies) {
    const res = await fetch(`${EXCHANGE_RATE_API}/latest/${c1}`);
    const obj = (await res.json()) as ExchangeRateApiResponse;
    for (const [c2, value] of Object.entries(obj.conversion_rates)) {
      conversions[`${c1}:${c2}`] = value;
    }
  }

  return {
    currencies,
    conversions,
    date: new Date(updatedAt),
  };
}
