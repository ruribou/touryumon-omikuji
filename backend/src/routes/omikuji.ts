import { Hono } from "hono";
import type { OmikujiRequest, OmikujiResponse } from "../types.js";
import { createSeededRandom, generateSeed } from "../logic/seed.js";
import { computeWeights, isBirthdayToday } from "../logic/weight.js";
import { drawFortune } from "../logic/fortune.js";

const app = new Hono();

/** 今日の日付を "YYYY-MM-DD"（ローカルタイム）で返す。 */
function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** "YYYY-MM-DD" 形式かつ妥当な日付かを検証する。 */
function isValidBirthday(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [, y, m, d] = match;
  const date = new Date(`${value}T00:00:00`);
  return (
    date.getFullYear() === Number(y) &&
    date.getMonth() + 1 === Number(m) &&
    date.getDate() === Number(d)
  );
}

// POST /api/omikuji
app.post("/", async (c) => {
  let body: Partial<OmikujiRequest>;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "リクエストボディが不正です。" }, 400);
  }

  const birthday = body.birthday;
  if (!isValidBirthday(birthday)) {
    return c.json(
      { error: "birthday は YYYY-MM-DD 形式で指定してください。" },
      400,
    );
  }

  const today = getTodayString();

  // 1. シード生成（決定論的）
  const seed = generateSeed(birthday, today);
  const rng = createSeededRandom(seed);

  // 2. 重み計算（誕生日・誕生月ボーナス適用）
  const weights = computeWeights(birthday, today);

  // 3. 抽選
  const draw = drawFortune(weights, rng);

  const response: OmikujiResponse = {
    rank: draw.rank,
    messages: draw.messages,
    isBirthday: isBirthdayToday(birthday, today),
    luckyColor: draw.luckyColor,
    luckyNumber: draw.luckyNumber,
  };

  return c.json(response);
});

export default app;
