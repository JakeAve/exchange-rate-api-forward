import { assertEquals, assert } from "$std/assert/mod.ts";
import { stub } from "$std/testing/mock.ts";
import { readRates } from "./readRates.ts";

const MOCK_API_RESPONSE = {
  result: "success",
  documentation: "https://www.exchangerate-api.com/docs",
  terms_of_use: "https://www.exchangerate-api.com/terms",
  time_last_update_unix: 1617184000,
  time_last_update_utc: "Fri, 15 Mar 2024 00:00:01 +0000",
  time_next_update_unix: 1617270400,
  time_next_update_utc: "Sat, 16 Mar 2024 00:00:01 +0000",
  base_code: "EUR",
  conversion_rates: {
    USD: 1.2,
    EUR: 1,
    CAD: 1.01,
  },
};

Deno.test("readRates() function returns the correct structure", async () => {
  const mockFetch = stub(
    globalThis,
    "fetch",
    (_input: string | URL | Request, _init?: RequestInit | undefined) => {
      const response = new Response(JSON.stringify(MOCK_API_RESPONSE));
      return Promise.resolve(response);
    }
  );

  const data = await readRates();

  assert(Object.hasOwn(data, "currencies"));
  assert(data.currencies.includes("EUR"));

  assert(Object.hasOwn(data, "conversions"));
  assertEquals(typeof data.conversions["EUR:USD"], "number");

  assert(Object.hasOwn(data, "date"));
  assert(data.date instanceof Date);

  mockFetch.restore();
});
