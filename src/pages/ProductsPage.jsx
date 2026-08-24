import FilterBar from "../components/FilterBar";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";
import { useProductFilters } from "../hooks/useProductFilters";

export default function ProductsPage() {
  // `products` is the full catalog held in memory (imported once). If it
  // instead comes from an API, fetch it once in a parent/loader and pass it
  // in here — the filtering below stays exactly the same either way.
  const {
    filters,
    activeFilterCount,
    filteredProducts,
    toggleCategory,
    toggleColor,
    setSort,
    setQuery,
    setInStockOnly,
    clearFilters,
  } = useProductFilters(products);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-sm uppercase tracking-[0.2em] text-ink/60">Products</h1>
        <p className="mt-1 text-[11px] tracking-[0.1em] text-ink/40">
          {filteredProducts.length} of {products.length} items
        </p>
      </header>

      <FilterBar
        filters={filters}
        activeFilterCount={activeFilterCount}
        onToggleCategory={toggleCategory}
        onToggleColor={toggleColor}
        onSortChange={setSort}
        onQueryChange={setQuery}
        onInStockChange={setInStockOnly}
        onClear={clearFilters}
      />

      <ProductGrid products={filteredProducts} />
    </main>
  );
}
