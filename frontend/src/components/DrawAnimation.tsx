/**
 * おみくじを引くアニメーション。
 * 筒（みくじ筒）が揺れ、おみくじ棒が覗くような演出。
 */
export function DrawAnimation() {
  return (
    <div className="flex flex-col items-center gap-8 animate-fade-up">
      <p className="text-lg tracking-widest text-gold">おみくじを振っています…</p>

      <div className="relative h-56 w-32">
        {/* みくじ棒（筒から覗く） */}
        <div className="absolute left-1/2 top-0 flex -translate-x-1/2 gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-1.5 rounded-full bg-washi/80"
              style={{ height: `${28 + i * 6}px` }}
            />
          ))}
        </div>

        {/* みくじ筒 本体（揺れる） */}
        <div className="absolute bottom-0 left-1/2 h-44 w-28 origin-bottom -translate-x-1/2 animate-shake">
          <div className="h-full w-full rounded-b-xl rounded-t-md border-2 border-gold/70 bg-gradient-to-b from-vermilion to-vermilion/80 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            {/* 筒の口 */}
            <div className="mx-auto mt-1 h-2 w-20 rounded-full bg-shrine/70" />
            {/* 飾り帯 */}
            <div className="mt-10 h-8 w-full bg-gold/80" />
            <div className="mt-2 flex justify-center">
              <span className="text-2xl font-bold tracking-widest text-shrine">
                籤
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-glow rounded-full bg-gold"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
