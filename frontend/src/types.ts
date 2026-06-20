// バックエンドのレスポンス型（backend/src/types.ts と対応）

export type RankName =
  | "大吉"
  | "吉"
  | "中吉"
  | "小吉"
  | "末吉"
  | "凶"
  | "大凶";

export interface OmikujiMessages {
  overall: string;
  love: string;
  work: string;
  health: string;
  money: string;
}

export interface OmikujiResponse {
  rank: RankName;
  messages: OmikujiMessages;
  isBirthday: boolean;
  luckyColor: string;
  luckyNumber: number;
}
