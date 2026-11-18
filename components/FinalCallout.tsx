import { PixelIcon } from "./PixelIcon";

export function FinalCallout() {
  return (
    <section className="final-callout" aria-labelledby="final-title">
      <div className="site-shell final-callout__inner">
        <span className="final-callout__status"><i />Estado actual</span>
        <h2 id="final-title">El laboratorio todavía no está abierto al público.</h2>
        <p>
          Antes de habilitarlo, el equipo validará la infraestructura, la seguridad y el funcionamiento de las sesiones.
        </p>
        <div className="final-callout__actions">
          <a href="#como-funciona">Entender cómo funciona <PixelIcon name="arrow" size={18} /></a>
        </div>
      </div>
    </section>
  );
}
