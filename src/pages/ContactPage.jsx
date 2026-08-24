export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-sm uppercase tracking-[0.2em] text-ink/60">Contact</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          Questions about sizing, an order, or anything else — write to us and
          we'll get back to you.
        </p>
      </header>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          // Wire this up to your email service / backend of choice.
          // Left intentionally unimplemented — no backend exists yet.
        }}
      >
        <Field label="Name" id="name" type="text" autoComplete="name" required />
        <Field label="Email" id="email" type="email" autoComplete="email" required />

        <div>
          <label
            htmlFor="message"
            className="block text-[11px] uppercase tracking-[0.12em] text-ink/60 mb-1.5"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full resize-none bg-transparent border-b border-ink/20 focus:border-ink outline-none py-1.5 text-sm tracking-wide transition-colors"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] bg-ink text-ivory hover:bg-ink/90 transition-colors"
        >
          Send message
        </button>
      </form>

      <p className="mt-10 text-[11px] uppercase tracking-[0.12em] text-ink/40">
        Or email us directly at{" "}
        <a href="mailto:contact@ivoribarcelona.com" className="underline underline-offset-4 text-ink/60 hover:text-ink">
          contact@ivoribarcelona.com
        </a>
      </p>
    </main>
  );
}

function Field({ label, id, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] uppercase tracking-[0.12em] text-ink/60 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        name={id}
        {...inputProps}
        className="w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-1.5 text-sm tracking-wide transition-colors"
      />
    </div>
  );
}
