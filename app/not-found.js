import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 lg:px-8">
      <div className="py-16 text-center">
        <svg viewBox="0 0 24 24" className="mx-auto h-14 w-14 text-accent" fill="currentColor" aria-hidden="true">
          <path d="M3 17h18a9 9 0 0 0-18 0z" />
          <path d="M12 2.5v3.5M4.6 6.1l2.4 2.4M19.4 6.1 17 8.5M1.5 12.5h3M19.5 12.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M2 20h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-accent">Error 404</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-[17px] text-muted">
          The page you&apos;re looking for has moved or no longer exists. Let&apos;s get you back to the collection.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/#shop" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-hover">
            Shop all styles
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/" className="inline-flex items-center rounded-full border border-ink/25 px-6 py-3 font-semibold transition hover:border-ink hover:bg-ink hover:text-bg">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
