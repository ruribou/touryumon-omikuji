import { useState, useCallback } from "react";
import type { OmikujiResponse } from "../types";

interface UseOmikujiResult {
  result: OmikujiResponse | null;
  loading: boolean;
  error: string | null;
  draw: (birthday: string) => Promise<void>;
  reset: () => void;
}

/**
 * おみくじAPIを呼び出すカスタムフック。
 * 演出のため、最低でも一定時間ローディングを表示する。
 */
export function useOmikuji(): UseOmikujiResult {
  const [result, setResult] = useState<OmikujiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const draw = useCallback(async (birthday: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    // アニメーション演出のための最低表示時間（ms）
    const minDelay = new Promise((resolve) => setTimeout(resolve, 2200));

    try {
      const fetchData = (async () => {
        const res = await fetch("/api/omikuji", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ birthday }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as
            | { error?: string }
            | null;
          throw new Error(data?.error ?? "おみくじの取得に失敗しました。");
        }
        return (await res.json()) as OmikujiResponse;
      })();

      const [data] = await Promise.all([fetchData, minDelay]);
      setResult(data);
    } catch (e) {
      await minDelay;
      setError(
        e instanceof Error
          ? e.message
          : "通信エラーが発生しました。サーバーが起動しているか確認してください。",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { result, loading, error, draw, reset };
}
