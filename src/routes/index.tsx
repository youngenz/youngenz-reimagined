import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Star, X } from "lucide-react";
import { PRODUCTS, CATEGORIES, bestPrice, inr, shopById, studentPrice, type Product, type Category } from "@/lib/data";
import { Shell } from "@/components/Shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Youngenz — Drip that fits your budget" },
      { name: "description", content: "Slide your budget, pick a vibe, and see who sells the look cheapest: Amazon, Flipkart or the shop down the road." },
      { property: "og:title", content: "Youngenz — Drip that fits your budget" },
      { property: "og:description", content: "Set a budget, pick a vibe, find the cheapest place to buy the look." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const BUDGETS = [500, 1000, 1500, 2000, 3000];

function Index() {
  const [budget, setBudget] = useState(1500);
  const [vibe, setVibe] = useState<Category | "All">("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Product | null>(null);

  const list = useMemo(() => {
    const w = q.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        bestPrice(p) <= budget &&
        (vibe === "All" || p.category === vibe) &&
        (!w || [p.name, p.category, p.gender, p.fabric].join(" ").toLowerCase().includes(w)),
    ).sort((a, b) => bestPrice(a) - bestPrice(b));
  }, [budget, vibe, q]);

  return (
    <Shell>
      <section className="px-5 pt-4">
        <h1 className="font-display text-[3.4rem] font-extrabold leading-[0.88] sm:text-7xl">
          same fit.
          <br />
          <span className="text-primary">less ₹.</span>
        </h1>
        <p className="mt-4 max-w-sm text-muted-foreground">
          Tell us your budget. We show who sells the look cheapest — online or local.
        </p>
      </section>

      <div className="mt-6 overflow-hidden border-y bg-primary py-2 text-primary-foreground">
        <div className="marquee flex w-max gap-8 font-mono text-xs font-bold uppercase">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Amazon vs Flipkart vs Local", "Student deals −10%", "Local delivery in hours", "Cashback from shops"].map((t) => (
              <span key={k + t}>✦ {t}</span>
            )),
          )}
        </div>
      </div>

      <section className="space-y-5 px-5 pt-6">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-mono text-xs uppercase text-muted-foreground">My budget</span>
            <span className="font-display text-3xl font-bold text-primary">{inr(budget)}</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {BUDGETS.map((b) => (
              <button key={b} onClick={() => setBudget(b)} className={`chip text-center ${budget === b ? "chip-on" : ""}`}>
                {b >= 1000 ? `${b / 1000}k` : b}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 rounded-2xl border bg-card px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="baggy jeans, linen, kurta…" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </label>

        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button key={c} onClick={() => setVibe(c)} className={`chip ${vibe === c ? "chip-on" : ""}`}>{c}</button>
          ))}
        </div>

        <p className="font-mono text-xs text-muted-foreground">{list.length} fits under {inr(budget)}</p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((p, i) => (
            <button key={p.id} onClick={() => setOpen(p)} className="rise group text-left" style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                {p.studentDeal && (
                  <span className="absolute left-2 top-2 rounded-full bg-hot px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-hot-foreground">student</span>
                )}
              </div>
              <p className="mt-2 line-clamp-1 text-sm font-semibold">{p.name}</p>
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-primary">{inr(bestPrice(p))}</span>
                <span className="flex items-center gap-0.5 text-xs text-muted-foreground"><Star className="h-3 w-3 fill-current" />{p.rating}</span>
              </div>
            </button>
          ))}
        </div>
        {list.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">Nothing yet — try a bigger budget or another vibe.</p>
        )}
      </section>

      {open && <PriceSheet p={open} onClose={() => setOpen(null)} />}
    </Shell>
  );
}

function PriceSheet({ p, onClose }: { p: Product; onClose: () => void }) {
  const shop = shopById(p.shopId);
  const rows = [
    { name: "Amazon", price: p.prices.amazon, note: "2–4 day delivery" },
    { name: "Flipkart", price: p.prices.flipkart, note: "2–5 day delivery" },
    { name: shop.name, price: p.prices.local, note: `${shop.area}, ${shop.city} · ${shop.deliveryHours}h delivery` },
  ];
  const min = Math.min(...rows.map((r) => r.price));
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-background/70 backdrop-blur-sm" onClick={onClose}>
      <div className="rise w-full max-w-lg rounded-t-3xl border bg-card p-5 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-4">
          <img src={p.image} alt={p.name} className="h-28 w-22 rounded-xl object-cover" />
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">{p.category} · {p.gender} · {p.fabric}</p>
            <h2 className="font-display text-2xl font-bold leading-tight">{p.name}</h2>
            <p className="mt-1 text-xs text-muted-foreground">Sizes {p.sizes.join(" / ")}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="self-start rounded-full border p-1.5"><X className="h-4 w-4" /></button>
        </div>
        <p className="mt-5 font-mono text-xs uppercase text-muted-foreground">Price battle</p>
        <div className="mt-2 space-y-2">
          {rows.map((r) => (
            <div key={r.name} className={`flex items-center justify-between rounded-2xl border p-3 ${r.price === min ? "border-primary bg-primary/10" : ""}`}>
              <div>
                <p className="font-semibold">{r.name} {r.price === min && <span className="ml-1 font-mono text-[10px] text-primary">CHEAPEST</span>}</p>
                <p className="text-xs text-muted-foreground">{r.note}</p>
              </div>
              <span className="font-display text-xl font-bold">{inr(r.price)}</span>
            </div>
          ))}
        </div>
        {p.studentDeal && (
          <p className="mt-3 rounded-2xl bg-hot/15 p-3 text-sm">Student ID? Pay <b>{inr(studentPrice(min))}</b> instead.</p>
        )}
        <p className="mt-3 text-center font-mono text-[10px] text-muted-foreground">Sample prices — not live listings.</p>
      </div>
    </div>
  );
}
