import { scrape } from "./scrape.ts";

Deno.cron("scrape an write results", "0 0 * * 1-5", async () => {
    await scrape();
    console.log(`Success at ${new Date().toString()}`)
});
