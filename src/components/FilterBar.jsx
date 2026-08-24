import { motion } from "framer-motion";
import { categories, colors } from "../data/products";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "name-asc", label: "Name, A–Z" },
];

const COLOR_SWATCH = {
  black: "#1b1b1b",
  white: "#f7f5f0",
  bone: "#e6dfd0",
  latte: "#c9b79c",
  brown: "#5c4433",
  camel: "#b98f5c",
  burgundy: "#5b1f2a",
  coral: "#e07a5f",
  yellow: "#e3b23c",
  print: "linear-gradient(135deg,#e3b23c,#e07a5f)",
  multi: "linear-gradient(135deg,#1b1b1b,#c9b79c,#e07a5f)",
};

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "px-3 py-1.5 text-[11px] tracking-[0.12em] uppercase border transition-colors",
        active
          ? "border-ink bg-ink text-ivory"
          : "border-ink/20 text-ink/70 hover:border-ink/60 hover:text-ink",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function FilterBar({
  filters,
  activeFilterCount,
  onToggleCategory,
  onToggleColor,
  onSortChange,
  onQueryChange,
  onInStockChange,
  onClear,
}) {
  return (
    <div className="border-b border-ink/10 pb-6 mb-8 space-y-5">
      {/* search + sort + in-stock */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={filters.q}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search products…"
          className="w-full sm:w-64 bg-transparent border-b border-ink/20 focus:border-ink outline-none py-1.5 text-sm tracking-wide placeholder:text-ink/40 transition-colors"
        />

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-ink/70 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => onInStockChange(e.target.checked)}
              className="h-3.5 w-3.5 accent-ink"
            />
            In stock only
          </label>

          <nav className="relative flex items-center gap-4">
            {SORTS.map((s) => {
              const active = filters.sort === s.value;
              return (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => onSortChange(s.value)}
                  className={[
                    "relative pb-1 text-[11px] uppercase tracking-[0.12em] transition-colors",
                    active ? "text-ink" : "text-ink/50 hover:text-ink",
                  ].join(" ")}
                >
                  {s.label}
                  {active && (
                    <motion.span
                      layoutId="sort-indicator"
                      className="absolute left-0 right-0 -bottom-[1px] h-px bg-ink"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* category chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] uppercase tracking-[0.12em] text-ink/40 mr-1">
          Category
        </span>
        {categories.map((c) => (
          <Chip key={c} active={filters.categories.includes(c)} onClick={() => onToggleCategory(c)}>
            {c}
          </Chip>
        ))}
      </div>

      {/* color swatches */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[11px] uppercase tracking-[0.12em] text-ink/40 mr-1">Color</span>
        {colors.map((c) => {
          const active = filters.colors.includes(c);
          return (
            <button
              key={c}
              type="button"
              onClick={() => onToggleColor(c)}
              aria-pressed={active}
              aria-label={c}
              title={c}
              className={[
                "h-6 w-6 rounded-full border transition-all",
                active ? "border-ink scale-110 ring-1 ring-ink ring-offset-2 ring-offset-ivory" : "border-ink/20",
              ].join(" ")}
              style={{ background: COLOR_SWATCH[c] || "#ccc" }}
            />
          );
        })}
      </div>

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="text-[11px] uppercase tracking-[0.12em] text-ink/50 hover:text-ink underline underline-offset-4"
        >
          Clear filters ({activeFilterCount})
        </button>
      )}
    </div>
  );
}
