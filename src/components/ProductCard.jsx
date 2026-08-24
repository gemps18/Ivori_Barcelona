import { motion } from "framer-motion";

const currency = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
}).format;

export default function ProductCard({ product }) {
  return (
    <motion.a
      layout
      href={product.url}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group block"
    >
      {/* fixed-ratio frame keeps every card's footprint identical before and
          after the image loads, so filtering never shifts layout (CLS) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {product.soldOut && (
          <span className="absolute left-2 top-2 bg-ivory/90 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-ink">
            Sold out
          </span>
        )}
      </div>

      <div className="mt-3 space-y-0.5">
        <h3 className="text-[13px] uppercase tracking-[0.08em] text-ink group-hover:underline underline-offset-4">
          {product.name}
        </h3>
        <p className="text-[13px] text-ink/60">{currency(product.price)}</p>
      </div>
    </motion.a>
  );
}
