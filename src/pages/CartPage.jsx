import { Link } from "react-router-dom";

// Placeholder cart page. No cart state management exists yet — this just
// establishes the route and layout. When you're ready to wire up real cart
// logic, this is where a useCart() context/hook would plug in, and the
// empty-state block below would be replaced with a line-item list.
export default function CartPage() {
  const items = [];

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-sm uppercase tracking-[0.2em] text-ink/60 mb-10">Cart</h1>

      {items.length === 0 ? (
        <div className="border-t border-ink/10 py-16 text-center">
          <p className="text-sm text-ink/60 mb-4">Your cart is empty.</p>
          <Link
            to="/products"
            className="inline-block text-[11px] uppercase tracking-[0.12em] underline underline-offset-4 text-ink/70 hover:text-ink"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-ink/10 border-t border-ink/10">
          {/* line items render here once cart state exists */}
        </ul>
      )}
    </main>
  );
}
