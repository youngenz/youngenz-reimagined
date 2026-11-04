import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, Clock, Phone, Truck } from "lucide-react";
import { SHOPS, CITIES } from "@/lib/data";
import { Shell } from "@/components/Shell";

export const Route = createFileRoute("/shops")({
  head: () => ({
    meta: [
      { title: "Local shops — Youngenz" },
      { name: "description", content: "Street-market fashion shops near you with same-day delivery, cashback and easy returns." },
      { property: "og:title", content: "Local shops — Youngenz" },
      { property: "og:description", content: "Find local fashion shops with fast delivery and cashback." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shops,
});

function Shops() {
  const [city, setCity] = useState("All");
  const list = SHOPS.filter((s) => city === "All" || s.city === city).sort((a, b) => a.distance - b.distance);
  return (
    <Shell>
      <section className="px-5 pt-4">
        <h1 className="font-display text-5xl font-extrabold leading-[0.9]">
          shop <span className="text-primary">local.</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Market prices, delivered in hours.</p>
        <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5">
          {CITIES.map((c) => (
            <button key={c} onClick={() => setCity(c)} className={`chip ${city === c ? "chip-on" : ""}`}>{c}</button>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {list.map((s, i) => (
            <article key={s.id} className="rise rounded-3xl border bg-card p-5" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="flex items-center gap-1.5 font-display text-xl font-bold">
                    {s.name} {s.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                  </h2>
                  <p className="text-sm text-muted-foreground">{s.area}, {s.city} · {s.distance} km</p>
                </div>
                <span className="rounded-full bg-hot px-2.5 py-1 font-mono text-[10px] font-bold text-hot-foreground">{s.cashback}% back</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{s.open}</span>
                <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5" />{s.deliveryHours}h delivery</span>
                <span>{s.speciality}</span>
                {s.easyReturn && <span>Easy returns</span>}
              </div>
              <a href={`tel:${s.phone}`} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-bold text-primary-foreground">
                <Phone className="h-4 w-4" /> Call shop
              </a>
            </article>
          ))}
        </div>
      </section>
    </Shell>
  );
}
