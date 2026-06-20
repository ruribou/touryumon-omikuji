import type { FortuneEntry, OmikujiMessages, RankName } from "../types.js";

/**
 * おみくじ結果データ
 *
 * 各ランクに基本確率（baseWeight, %）と5項目のコメントを定義する。
 * 配列の順序が重み配列のインデックスに対応する。
 */
export const FORTUNES: FortuneEntry[] = [
  {
    rank: "大吉",
    baseWeight: 10,
    messages: {
      overall: "今日はすべてが順調に進む吉日です。自信を持って前へ進みましょう。",
      love: "素敵な出会いや進展が期待できます。笑顔を忘れずに。",
      work: "積極的な行動が実を結ぶでしょう。挑戦に最適な日です。",
      health: "体調は良好。外出やスポーツには最適な一日です。",
      money: "思わぬ臨時収入があるかもしれません。",
    },
  },
  {
    rank: "吉",
    baseWeight: 25,
    messages: {
      overall: "穏やかで満ち足りた一日になりそうです。感謝の心を大切に。",
      love: "ふとした親切が良縁を呼びます。素直さが鍵です。",
      work: "丁寧な仕事が評価されます。基本を大切にしましょう。",
      health: "心身ともに安定しています。休息も忘れずに。",
      money: "堅実な選択が吉。無駄遣いを控えれば安泰です。",
    },
  },
  {
    rank: "中吉",
    baseWeight: 25,
    messages: {
      overall: "良い流れの中にいます。焦らず一歩ずつ進みましょう。",
      love: "じっくり育む関係が幸せを呼びます。",
      work: "周囲との協力が成功の鍵。相談を大切に。",
      health: "概ね良好。生活リズムを整えるとさらに good。",
      money: "コツコツ貯めることが将来の安心につながります。",
    },
  },
  {
    rank: "小吉",
    baseWeight: 20,
    messages: {
      overall: "小さな幸せに気づける一日。日常を楽しみましょう。",
      love: "急がば回れ。誠実さが信頼を生みます。",
      work: "目の前のことに集中すると道が開けます。",
      health: "少し疲れ気味かも。早めの休息を心がけて。",
      money: "計画的に使えば問題なし。衝動買いに注意。",
    },
  },
  {
    rank: "末吉",
    baseWeight: 12,
    messages: {
      overall: "これから運気が上向く兆し。準備を整える日です。",
      love: "焦りは禁物。自然体でいることが大切です。",
      work: "下準備が後の成果につながります。地道にいきましょう。",
      health: "無理は禁物。体の声に耳を傾けて。",
      money: "今は守りの時。大きな出費は控えめに。",
    },
  },
  {
    rank: "凶",
    baseWeight: 6,
    messages: {
      overall: "慎重に行動すれば災いを避けられます。謙虚さを忘れずに。",
      love: "誤解が生まれやすい日。言葉を丁寧に選んで。",
      work: "確認を怠らないこと。ミスに注意しましょう。",
      health: "体調を崩しやすい時。暖かくして休みましょう。",
      money: "無駄な出費に注意。財布の紐を固く。",
    },
  },
  {
    rank: "大凶",
    baseWeight: 2,
    messages: {
      overall: "今日は静かに過ごすが吉。明日への英気を養いましょう。",
      love: "すれ違いに注意。今は距離を保つのが賢明です。",
      work: "大きな決断は先送りに。守りに徹しましょう。",
      health: "心身ともに休養を。無理は禁物です。",
      money: "金銭トラブルに警戒を。契約事は慎重に。",
    },
  },
];

// ラッキーカラーの候補
export const LUCKY_COLORS: string[] = [
  "金色",
  "朱色",
  "藍色",
  "若草色",
  "白",
  "桜色",
  "瑠璃色",
  "山吹色",
  "紫紺",
  "茜色",
];

/**
 * 重み配列とシード乱数から、当選したランクのインデックスを返す（重み付きルーレット抽選）。
 *
 * @param weights 各ランクの重み配列（FORTUNES と同じ順序）
 * @param rng     [0,1) を返す疑似乱数関数
 */
export function weightedRandom(weights: number[], rng: () => number): number {
  const total = weights.reduce((sum, w) => sum + w, 0);
  let threshold = rng() * total;
  for (let i = 0; i < weights.length; i++) {
    threshold -= weights[i];
    if (threshold < 0) {
      return i;
    }
  }
  // 浮動小数点誤差対策：末尾を返す
  return weights.length - 1;
}

export interface DrawResult {
  rank: RankName;
  messages: OmikujiMessages;
  luckyColor: string;
  luckyNumber: number;
}

/**
 * 重み配列とシード乱数からおみくじを抽選し、付随情報（ラッキーカラー・ナンバー）も決定する。
 */
export function drawFortune(weights: number[], rng: () => number): DrawResult {
  const index = weightedRandom(weights, rng);
  const fortune = FORTUNES[index];

  const luckyColor = LUCKY_COLORS[Math.floor(rng() * LUCKY_COLORS.length)];
  const luckyNumber = Math.floor(rng() * 9) + 1; // 1〜9

  return {
    rank: fortune.rank,
    messages: fortune.messages,
    luckyColor,
    luckyNumber,
  };
}
