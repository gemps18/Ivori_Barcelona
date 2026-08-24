import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  [
    "relative pb-1 transition-colors hover:text-ink",
    isActive ? "text-ink" : "text-ink/60",
  ].join(" ");

export default function Navbar() {
  return (
    <header className="border-b border-ink/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-sm uppercase tracking-[0.3em] text-ink">
          Ivori Barcelona
        </NavLink>

        <nav className="flex items-center gap-6 text-[11px] uppercase tracking-[0.12em]">
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/cart" className={navLinkClass}>
            Cart
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
