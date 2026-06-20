// おみくじのランク名
export type RankName =
  | "大吉"
  | "吉"
  | "中吉"
  | "小吉"
  | "末吉"
  | "凶"
  | "大凶";

// 5項目のコメント
export interface OmikujiMessages {
  overall: string; // 運勢（総合）
  love: string; // 恋愛
  work: string; // 仕事
  health: string; // 健康
  money: string; // 金運
}

// 1ランク分のおみくじ定義
export interface FortuneEntry {
  rank: RankName;
  baseWeight: number; // 基本確率（%）
  messages: OmikujiMessages;
}

// APIリクエストボディ
export interface OmikujiRequest {
  birthday: string; // "YYYY-MM-DD"
}

// APIレスポンスボディ
export interface OmikujiResponse {
  rank: RankName;
  messages: OmikujiMessages;
  isBirthday: boolean;
  luckyColor: string;
  luckyNumber: number;
}
