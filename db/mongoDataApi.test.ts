import { assert, assertEquals } from "$std/assert/mod.ts";
import { stub } from "$std/testing/mock.ts";
import { findOne, insertOne } from "./mongoDataApi.ts";

Deno.test("findOne() function retrieves the correct document", async () => {
  const mockFetch = stub(
    globalThis,
    "fetch",
    (_input: string | URL | Request, _init?: RequestInit | undefined) => {
      const mockResponse = {
        document: { _id: "unique-id", name: "Test Document", value: 42 },
      };
      const response = new Response(JSON.stringify(mockResponse));
      return Promise.resolve(response);
    },
  );

  const result = await findOne({
    collection: "testCollection",
    filter: { name: "Test Document" },
  });

  assertEquals(result.document.name, "Test Document");
  assertEquals(result.document.value, 42);

  mockFetch.restore();
});

Deno.test("insertOne() function successfully inserts a document", async () => {
  const mockFetch = stub(
    globalThis,
    "fetch",
    (_input: string | URL | Request, _init?: RequestInit | undefined) => {
      // Simulate a successful insert operation with a MongoDB ObjectId
      const mockResponse = {
        insertedId: "new-unique-id",
      };
      const response = new Response(JSON.stringify(mockResponse));
      return Promise.resolve(response);
    },
  );

  const result = await insertOne({
    collection: "testCollection",
    document: { name: "New Document", value: 100 },
  });

  assert(Object.hasOwn(result, "insertedId"));
  assertEquals(typeof result.insertedId, "string");

  mockFetch.restore();
});
