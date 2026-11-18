import { ProductMark } from "./ProductMark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell site-footer__top">
        <a href="#contenido-principal" aria-label="Aula Remota, volver al inicio"><ProductMark /></a>
        <p>Aula Remota es un producto de RFD Innovations.</p>
      </div>
      <div className="site-shell site-footer__bottom">
        <span>© 2026 RFD Innovations</span>
        <span>aulasremotas.net</span>
        <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Licencia de la fotografía</a>
      </div>
    </footer>
  );
}
