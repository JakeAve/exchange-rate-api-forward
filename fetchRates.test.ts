import { assert, assertEquals, assertObjectMatch } from "$std/assert/mod.ts";
import { stub } from "$std/testing/mock.ts";
import { fetchRates } from "./fetchRates.ts";
import responseFixture from "./fixtures/result.json" with { type: "json" };
import currenciesFixture from "./fixtures/currencies.json" with {
  type: "json",
};
import conversionsFixture from "./fixtures/conversions.json" with {
  type: "json",
};

Deno.test("readRates() function returns the correct structure", async () => {
  const mockFetch = stub(
    globalThis,
    "fetch",
    (_input: string | URL | Request, _init?: RequestInit | undefined) => {
      const response = new Response(JSON.stringify(responseFixture));
      return Promise.resolve(response);
    },
  );

  const data = await fetchRates();

  assert(Object.hasOwn(data, "currencies"));
  assertEquals(data.currencies, currenciesFixture);

  assert(Object.hasOwn(data, "conversions"));
  assertObjectMatch(data.conversions, conversionsFixture);

  assert(Object.hasOwn(data, "date"));
  assert(data.date instanceof Date);

  mockFetch.restore();
});
