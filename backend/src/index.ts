import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import omikuji from "./routes/omikuji.js";

const app = new Hono();

// フロントエンド（localhost:5173）からのアクセスを許可
app.use("/api/*", cors());

// ヘルスチェック
app.get("/", (c) => c.text("おみくじ API 稼働中 🎋"));

// おみくじエンドポイント
app.route("/api/omikuji", omikuji);

const port = 3000;
console.log(`🎋 おみくじ API server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
