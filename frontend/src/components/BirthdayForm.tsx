import { useState, type FormEvent } from "react";

interface BirthdayFormProps {
  onSubmit: (birthday: string) => void;
}

/**
 * 生年月日入力フォーム。
 * 「おみくじを引く」ボタンで親に生年月日を渡す。
 */
export function BirthdayForm({ onSubmit }: BirthdayFormProps) {
  const [birthday, setBirthday] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!birthday) {
      setLocalError("生年月日を入力してください。");
      return;
    }
    if (birthday > today) {
      setLocalError("未来の日付は入力できません。");
      return;
    }
    setLocalError(null);
    onSubmit(birthday);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col items-center gap-6 animate-fade-up"
    >
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-widest text-gold drop-shadow-[0_2px_8px_rgba(201,168,76,0.5)]">
          おみくじ
        </h1>
        <p className="text-sm tracking-wide text-washi/70">
          生年月日を入れて、今日の運勢を占いましょう
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <label
          htmlFor="birthday"
          className="text-sm tracking-wide text-washi/80"
        >
          生年月日
        </label>
        <input
          id="birthday"
          type="date"
          value={birthday}
          max={today}
          onChange={(e) => setBirthday(e.target.value)}
          className="rounded-lg border border-gold/40 bg-shrine/60 px-4 py-3 text-lg text-washi outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40 [color-scheme:dark]"
        />
        {localError && (
          <p className="text-sm text-vermilion">{localError}</p>
        )}
      </div>

      <button
        type="submit"
        className="group relative w-full overflow-hidden rounded-lg border border-gold bg-gradient-to-b from-gold/90 to-gold/70 px-6 py-3 text-lg font-bold tracking-widest text-shrine shadow-lg transition hover:from-gold hover:to-gold/80 hover:shadow-[0_0_20px_rgba(201,168,76,0.6)] active:scale-95"
      >
        おみくじを引く
      </button>
    </form>
  );
}
