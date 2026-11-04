import { Link } from "@tanstack/react-router";
import { Flame, MapPin } from "lucide-react";
import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-5xl pb-28">
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background/85 px-5 py-4 backdrop-blur">
        <Link to="/" className="font-display text-2xl font-extrabold">
          youngenz<span className="text-primary">.</span>
        </Link>
        <span className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase text-muted-foreground">
          demo prices
        </span>
      </header>
      {children}
      <nav className="fixed inset-x-0 bottom-4 z-30 mx-auto flex w-fit gap-1 rounded-full border bg-card/95 p-1.5 shadow-2xl backdrop-blur">
        <Link to="/" className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-muted-foreground" activeProps={{ className: "bg-primary !text-primary-foreground" }} activeOptions={{ exact: true }}>
          <Flame className="h-4 w-4" /> Drops
        </Link>
        <Link to="/shops" className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-muted-foreground" activeProps={{ className: "bg-primary !text-primary-foreground" }}>
          <MapPin className="h-4 w-4" /> Local
        </Link>
      </nav>
    </div>
  );
}
