import { outcomes } from "@/lib/content";

export function Outcomes() {
  return (
    <section className="outcomes-section" id="beneficios" aria-labelledby="outcomes-title">
      <div className="site-shell">
        <div className="outcomes-section__intro">
          <span className="section-index">02 / Beneficios previstos</span>
          <div>
            <h2 id="outcomes-title">Qué busca mejorar Aula Remota</h2>
            <p>
              Son objetivos del diseño actual. Las pruebas definirán el rendimiento y los requisitos finales.
            </p>
          </div>
        </div>

        <ol className="outcomes-list">
          {outcomes.map((outcome) => (
            <li className="outcome-row" key={outcome.number}>
              <span className="outcome-row__number">{outcome.number}</span>
              <h3>{outcome.title}</h3>
              <p>{outcome.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
