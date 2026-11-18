import { BrandLogo } from "./BrandLogo";

export function RfdSignature() {
  return (
    <section className="rfd-section" aria-labelledby="rfd-title">
      <div className="site-shell rfd-section__grid">
        <div className="rfd-section__copy">
          <span className="section-index">05 / Empresa y producto</span>
          <h2 id="rfd-title">Aula Remota es un producto de RFD Innovations.</h2>
          <p>
            RFD Innovations diseña y desarrolla el proyecto. La página pública y el laboratorio son servicios separados.
          </p>
        </div>
        <div className="rfd-signature">
          <div className="rfd-signature__logo"><BrandLogo /></div>
          <dl>
            <div><dt>Producto</dt><dd>Aula Remota</dd></div>
            <div><dt>Empresa</dt><dd>RFD Innovations</dd></div>
            <div><dt>Laboratorio</dt><dd>lab.aulasremotas.net</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
