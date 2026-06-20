import { FORTUNES } from "./fortune.js";

/**
 * 重み付けロジック
 *
 * 基本重みに対し、誕生日・誕生月のボーナスを適用する。
 */

/**
 * 基本重み配列を返す（FORTUNES の baseWeight 順）。
 */
export function getBaseWeights(): number[] {
  return FORTUNES.map((f) => f.baseWeight);
}

/**
 * "YYYY-MM-DD" 形式の文字列から月と日を取り出す。
 */
function parseMonthDay(dateStr: string): { month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return null;
  return { month: Number(match[2]), day: Number(match[3]) };
}

/**
 * 今日が誕生日（月日一致）かどうかを判定する。
 */
export function isBirthdayToday(birthday: string, today: string): boolean {
  const b = parseMonthDay(birthday);
  const t = parseMonthDay(today);
  if (!b || !t) return false;
  return b.month === t.month && b.day === t.day;
}

/**
 * 今日が誕生月（月のみ一致）かどうかを判定する。
 */
export function isBirthdayMonth(birthday: string, today: string): boolean {
  const b = parseMonthDay(birthday);
  const t = parseMonthDay(today);
  if (!b || !t) return false;
  return b.month === t.month;
}

/**
 * 誕生日・誕生月ボーナスを適用した重み配列を返す（元配列は変更しない）。
 *
 * - 誕生日（月日一致）: 大吉・吉の重みを大幅UP、凶系を抑制
 * - 誕生月（月一致）  : 吉系の重みを微UP
 *
 * FORTUNES のインデックス: 0=大吉, 1=吉, 2=中吉, 3=小吉, 4=末吉, 5=凶, 6=大凶
 */
export function applyBirthdayBonus(
  weights: number[],
  birthday: string,
  today: string,
): number[] {
  const result = [...weights];

  if (isBirthdayToday(birthday, today)) {
    // 誕生日：大吉・吉を大幅UP、凶系を抑制
    result[0] += 40; // 大吉
    result[1] += 20; // 吉
    result[2] += 5; // 中吉
    result[5] = Math.max(0, result[5] - 4); // 凶
    result[6] = Math.max(0, result[6] - 1.5); // 大凶
  } else if (isBirthdayMonth(birthday, today)) {
    // 誕生月：吉系を微UP
    result[0] += 5; // 大吉
    result[1] += 8; // 吉
    result[2] += 5; // 中吉
    result[3] += 3; // 小吉
  }

  return result;
}

/**
 * 基本重みに誕生日ボーナスを適用した最終的な重み配列を計算する。
 */
export function computeWeights(birthday: string, today: string): number[] {
  return applyBirthdayBonus(getBaseWeights(), birthday, today);
}
