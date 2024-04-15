// import { assertEquals, assert } from "$std/assert/mod.ts";
// import { stub } from "$std/testing/mock.ts";
// import { readRates } from "./readRates.ts";
// import { insertOne } from "./db/mongoDataApi.ts";
// import { scrape } from "./scrape.ts";

// Deno.test(
//   "scrape() function performs insert operations correctly",
//   async () => {
//     // Stub the readRates function to return a mock response
//     const mockReadRates = stub({ readRates }, "readRates", () =>
//       Promise.resolve({
//         currencies: ["EUR", "USD", "CAD"],
//         conversions: { "EUR:USD": 1.2, "EUR:CAD": 1.01 },
//         date: new Date("2024-03-15T00:00:01Z"),
//       })
//     );

//     // Stub the insertOne function to track calls and ensure it is called correctly
//     // deno-lint-ignore no-explicit-any
//     const insertOneCalls: any[] = [];
//     const mockInsertOne = stub({ insertOne }, "insertOne", (options) => {
//       insertOneCalls.push(options);
//       return Promise.resolve({ insertedId: "mock-id" });
//     });

//     // Run the scrape function
//     await scrape();

//     // Assert that readRates was called once
//     assertEquals(mockReadRates.calls.length, 1);

//     // Assert that insertOne was called twice
//     assertEquals(insertOneCalls.length, 2);

//     // Assert that the first call to insertOne was with the correct options for "currencies"
//     assertEquals(insertOneCalls[0].collection, "currencies");
//     assert(insertOneCalls[0].document.currencies.includes("EUR"));

//     // Assert that the second call to insertOne was with the correct options for "conversions"
//     assertEquals(insertOneCalls[1].collection, "conversions");
//     assertEquals(insertOneCalls[1].document.conversions["EUR:USD"], 1.2);

//     mockReadRates.restore();
//     mockInsertOne.restore();
//   }
// );
