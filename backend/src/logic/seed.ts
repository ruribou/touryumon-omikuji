/**
 * シード値生成ロジック
 *
 * 生年月日文字列と今日の日付文字列を結合し、決定論的なハッシュ値を生成する。
 * 同じ人・同じ日であれば必ず同じシード値になる。
 */

/**
 * 文字列から 32bit 符号なし整数のハッシュ値を生成する（FNV-1a 系の簡易実装）。
 */
export function hashString(input: string): number {
  let hash = 2166136261; // FNV offset basis
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    // FNV prime を掛ける（オーバーフローを避けるため Math.imul を使用）
    hash = Math.imul(hash, 16777619);
  }
  // 符号なし 32bit に変換
  return hash >>> 0;
}

/**
 * 生年月日と今日の日付からシード値を生成する。
 *
 * @param birthday 生年月日 "YYYY-MM-DD"
 * @param today    今日の日付 "YYYY-MM-DD"
 */
export function generateSeed(birthday: string, today: string): number {
  return hashString(`${birthday}|${today}`);
}

/**
 * シード値から決定論的な疑似乱数 [0, 1) を返す関数を生成する（mulberry32）。
 * 呼び出すたびに次の乱数を返す。
 */
export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return function (): number {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
