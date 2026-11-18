export function ProductMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="product-mark" aria-label="Aula Remota">
      <span className="product-mark__glyph" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className={compact ? "sr-only" : "product-mark__name"}>
        <strong>Aula</strong> Remota
      </span>
    </span>
  );
}
