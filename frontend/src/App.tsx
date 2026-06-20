import { useOmikuji } from "./hooks/useOmikuji";
import { BirthdayForm } from "./components/BirthdayForm";
import { DrawAnimation } from "./components/DrawAnimation";
import { OmikujiResult } from "./components/OmikujiResult";

export default function App() {
  const { result, loading, error, draw, reset } = useOmikuji();

  return (
    <main className="flex min-h-full flex-col items-center justify-center px-4 py-10">
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        {loading ? (
          <DrawAnimation />
        ) : result ? (
          <OmikujiResult result={result} onRetry={reset} />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <BirthdayForm onSubmit={draw} />
            {error && (
              <p className="max-w-sm rounded-lg border border-vermilion/50 bg-vermilion/10 px-4 py-2 text-center text-sm text-vermilion">
                {error}
              </p>
            )}
          </div>
        )}
      </div>

      <footer className="mt-10 text-center text-xs tracking-widest text-washi/40">
        ／＼ 同じ人・同じ日なら、何度引いても同じ結果 ／＼
      </footer>
    </main>
  );
}
