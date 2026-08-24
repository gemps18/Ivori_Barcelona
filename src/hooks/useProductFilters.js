import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// --- URL <-> filter-state helpers -----------------------------------------
// Everything the grid needs lives in the URL, so a filtered view is always
// bookmarkable/shareable and survives a refresh with zero extra state.

function parseList(searchParams, key) {
  const raw = searchParams.get(key);
  return raw ? raw.split(",").filter(Boolean) : [];
}

const SORT_OPTIONS = {
  featured: (a, b) => a.__index - b.__index, // preserves catalog order
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "name-asc": (a, b) => a.name.localeCompare(b.name),
};

/**
 * Client-side filtering over a catalog that's already in memory (or fetched
 * once by the caller). No network round-trip happens on filter change —
 * every update is a synchronous re-derivation via useMemo.
 */
export function useProductFilters(products) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      categories: parseList(searchParams, "category"),
      colors: parseList(searchParams, "color"),
      sort: searchParams.get("sort") || "featured",
      inStockOnly: searchParams.get("inStock") === "1",
      q: searchParams.get("q") || "",
    }),
    [searchParams]
  );

  const activeFilterCount =
    filters.categories.length +
    filters.colors.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.q ? 1 : 0);

  // Single entry point for every write to the URL. Empty/false values are
  // deleted rather than written so the URL stays clean (no `?category=`).
  const patchParams = useCallback(
    (updates) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const [key, value] of Object.entries(updates)) {
            const isEmpty =
              value === null ||
              value === undefined ||
              value === "" ||
              value === false ||
              (Array.isArray(value) && value.length === 0);

            if (isEmpty) {
              next.delete(key);
            } else if (Array.isArray(value)) {
              next.set(key, value.join(","));
            } else if (value === true) {
              next.set(key, "1");
            } else {
              next.set(key, String(value));
            }
          }
          return next;
        },
        { replace: true } // filtering shouldn't spam browser history
      );
    },
    [setSearchParams]
  );

  const toggleCategory = useCallback(
    (value) => {
      const next = filters.categories.includes(value)
        ? filters.categories.filter((c) => c !== value)
        : [...filters.categories, value];
      patchParams({ category: next });
    },
    [filters.categories, patchParams]
  );

  const toggleColor = useCallback(
    (value) => {
      const next = filters.colors.includes(value)
        ? filters.colors.filter((c) => c !== value)
        : [...filters.colors, value];
      patchParams({ color: next });
    },
    [filters.colors, patchParams]
  );

  const setSort = useCallback((value) => patchParams({ sort: value }), [patchParams]);
  const setQuery = useCallback((value) => patchParams({ q: value }), [patchParams]);
  const setInStockOnly = useCallback((value) => patchParams({ inStock: value }), [patchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  const filteredProducts = useMemo(() => {
    const indexed = products.map((p, __index) => ({ ...p, __index }));

    const result = indexed.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.colors.length && !filters.colors.includes(p.color)) return false;
      if (filters.inStockOnly && p.soldOut) return false;
      if (filters.q && !p.name.toLowerCase().includes(filters.q.toLowerCase())) return false;
      return true;
    });

    const comparator = SORT_OPTIONS[filters.sort] || SORT_OPTIONS.featured;
    return [...result].sort(comparator);
  }, [products, filters]);

  return {
    filters,
    activeFilterCount,
    filteredProducts,
    toggleCategory,
    toggleColor,
    setSort,
    setQuery,
    setInStockOnly,
    clearFilters,
  };
}
