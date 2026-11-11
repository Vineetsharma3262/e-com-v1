export function Logo({ tone = "ink", withWord = true, className = "" }) {
  const word = tone === "light" ? "text-white" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="8" fill="var(--accent)" />
        <path d="M8 7h4v6h8V7h4v18h-4v-7h-8v7H8V7Z" fill="#fff" />
      </svg>
      {withWord ? (
        <span className={`text-[1.35rem] font-extrabold leading-none tracking-tight ${word}`}>haat</span>
      ) : null}
    </span>
  );
}
