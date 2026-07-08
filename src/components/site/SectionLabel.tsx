export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-primary-glow">{index}</span>
      <span className="h-px w-10 bg-border" />
      <span className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">{title}</span>
    </div>
  );
}