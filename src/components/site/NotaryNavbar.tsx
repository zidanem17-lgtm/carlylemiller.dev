import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

export function NotaryNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#notary-top" className="group flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg border border-border bg-secondary font-display text-sm font-bold text-primary-foreground shadow-[inset_0_0_20px_rgba(124,116,255,0.25)]">
            CM
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-sm font-medium tracking-tight">Carlyle Miller</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Notary Public
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/"
            className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Portfolio ↗
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={cn("block h-px w-5 bg-current transition", open && "translate-y-[6px] rotate-45")} />
            <span className={cn("block h-px w-5 bg-current transition", open && "opacity-0")} />
            <span className={cn("block h-px w-5 bg-current transition", open && "-translate-y-[6px] -rotate-45")} />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col px-6 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/50 py-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground last:border-0 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/"
              onClick={() => setOpen(false)}
              className="py-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              Portfolio ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
