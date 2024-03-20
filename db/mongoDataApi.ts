import { load } from "$std/dotenv/mod.ts";

const env = await load();
const {
  MONGO_ATLAS_DATA_API_KEY,
  MONGO_ATLAS_DATA_API_URL,
  MONGO_DB_NAME,
  MONGO_CLUSTER_NAME,
} = env;

type collectionOptions = "conversions" | "currencies" | "testCollection";

interface Options {
  collection?: collectionOptions;
  filter?: Record<string, string | number>;
  sort?: Record<string, string | number>;
  limit?: number;
  // deno-lint-ignore no-explicit-any
  documents?: any[];
  // deno-lint-ignore no-explicit-any
  document?: any
}

type operations =
  | "insertOne"
  | "insertMany"
  | "find"
  | "findOne"
  | "updateOne"
  | "updateMany";

async function runAction(operation: operations, options: Options) {
  const resp = await fetch(`${MONGO_ATLAS_DATA_API_URL}/action/${operation}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": MONGO_ATLAS_DATA_API_KEY,
    },
    body: JSON.stringify({
      database: MONGO_DB_NAME,
      dataSource: MONGO_CLUSTER_NAME,
      ...options,
    }),
  });
  return resp.json();
}

export function findOne(options: Options) {
  return runAction("findOne", options);
}

export function insertOne(options: Options) {
    return runAction("insertOne", options);
}
