import { readRates } from "./readRates.ts";
import { insertOne } from "./db/mongoDataApi.ts";

export async function scrape() {
  const { currencies, conversions, date } = await readRates();

  const proms = await Promise.allSettled([
    insertOne({
      collection: "currencies",
      document: {
        date,
        currencies,
      },
    }).then(() => console.log(`${new Date()} Currencies saved`)),
    insertOne({
      collection: "conversions",
      document: { date, conversions },
    }).then(() => console.log(`${new Date()} Conversions saved`)),
  ]);

  const rejected = proms
    .filter((p) => p.status === "rejected")
    .map((p) => (p as PromiseRejectedResult).reason);
  if (rejected.length) console.log(rejected);
}

await scrape();
