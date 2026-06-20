import type { OmikujiResponse, RankName } from "../types";

interface OmikujiResultProps {
  result: OmikujiResponse;
  onRetry: () => void;
}

// ランクごとの色味設定
const RANK_STYLE: Record<RankName, { color: string; glow: string }> = {
  大吉: { color: "text-vermilion", glow: "drop-shadow-[0_0_16px_rgba(230,57,70,0.8)]" },
  吉: { color: "text-gold", glow: "drop-shadow-[0_0_12px_rgba(201,168,76,0.7)]" },
  中吉: { color: "text-gold", glow: "drop-shadow-[0_0_10px_rgba(201,168,76,0.6)]" },
  小吉: { color: "text-gold", glow: "drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]" },
  末吉: { color: "text-washi", glow: "drop-shadow-[0_0_8px_rgba(245,240,232,0.4)]" },
  凶: { color: "text-aigray", glow: "" },
  大凶: { color: "text-aigray", glow: "" },
};

const MESSAGE_ITEMS: { key: keyof OmikujiResponse["messages"]; label: string; icon: string }[] = [
  { key: "overall", label: "総合運", icon: "🎴" },
  { key: "love", label: "恋愛運", icon: "💗" },
  { key: "work", label: "仕事運", icon: "💼" },
  { key: "health", label: "健康運", icon: "🌿" },
  { key: "money", label: "金運", icon: "💰" },
];

/**
 * おみくじ結果表示。
 * ランク・5項目のコメント・ラッキーカラー/ナンバーを表示する。
 */
export function OmikujiResult({ result, onRetry }: OmikujiResultProps) {
  const style = RANK_STYLE[result.rank];

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      {/* おみくじ短冊（落ちてくる演出） */}
      <div className="w-full animate-fall-in rounded-xl border-2 border-gold/60 bg-shrine/70 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur">
        {result.isBirthday && (
          <p className="mb-2 text-center text-sm tracking-widest text-vermilion animate-glow">
            🎉 お誕生日おめでとうございます 🎉
          </p>
        )}

        <p className="text-center text-sm tracking-[0.4em] text-washi/60">
          今日の運勢
        </p>
        <p
          className={`my-2 text-center text-7xl font-bold tracking-widest ${style.color} ${style.glow}`}
        >
          {result.rank}
        </p>

        <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        {/* 5項目コメント */}
        <ul className="flex flex-col gap-3">
          {MESSAGE_ITEMS.map((item, i) => (
            <li
              key={item.key}
              className="animate-fade-up opacity-0"
              style={{ animationDelay: `${0.4 + i * 0.12}s`, animationFillMode: "forwards" }}
            >
              <div className="flex items-baseline gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-sm font-bold tracking-widest text-gold">
                  {item.label}
                </span>
              </div>
              <p className="ml-6 mt-0.5 text-sm leading-relaxed text-washi/90">
                {result.messages[item.key]}
              </p>
            </li>
          ))}
        </ul>

        <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        {/* ラッキーカラー・ナンバー */}
        <div className="flex justify-around text-center">
          <div>
            <p className="text-xs tracking-widest text-washi/60">ラッキーカラー</p>
            <p className="mt-1 text-xl font-bold text-gold">{result.luckyColor}</p>
          </div>
          <div className="w-px bg-gold/30" />
          <div>
            <p className="text-xs tracking-widest text-washi/60">ラッキーナンバー</p>
            <p className="mt-1 text-xl font-bold text-gold">{result.luckyNumber}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onRetry}
        className="rounded-lg border border-gold/60 bg-shrine/60 px-6 py-2.5 text-sm font-bold tracking-widest text-gold transition hover:bg-gold/10 hover:shadow-[0_0_16px_rgba(201,168,76,0.4)] active:scale-95"
      >
        もう一度引く
      </button>
    </div>
  );
}
