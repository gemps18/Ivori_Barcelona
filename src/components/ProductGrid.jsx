import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-sm uppercase tracking-[0.12em] text-ink/50">
          No products match these filters.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
