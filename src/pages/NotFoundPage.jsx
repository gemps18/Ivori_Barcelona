import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.2em] text-ink/60 mb-3">Page not found</p>
      <Link
        to="/products"
        className="text-[11px] uppercase tracking-[0.12em] underline underline-offset-4 text-ink/70 hover:text-ink"
      >
        Back to products
      </Link>
    </main>
  );
}
