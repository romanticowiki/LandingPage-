import Image from "next/image";

export function LabContext() {
  return (
    <section className="context-section" id="el-problema" aria-labelledby="context-title">
      <div className="site-shell">
        <div className="context-section__intro">
          <span className="section-index">01 / El problema</span>
          <h2 id="context-title">Instalar y mantener software en cada computadora multiplica el trabajo.</h2>
          <div className="context-section__body">
            <p>
              En un aula de cómputo, una instalación o actualización puede repetirse en cada equipo. Si alguna computadora queda con una versión o configuración distinta, la clase no trabaja en el mismo entorno.
            </p>
            <p>
              Aula Remota parte de ese problema: reducir tareas repetidas sin reemplazar todas las computadoras del aula.
            </p>
          </div>
        </div>

        <figure className="context-photo">
          <div className="context-photo__frame">
            <Image
              alt="Estudiantes trabajando frente a computadoras en un aula de cómputo"
              className="context-photo__image"
              fill
              priority={false}
              sizes="(max-width: 767px) 100vw, (max-width: 1439px) 88vw, 1240px"
              src="/aula-computo-haseeb-modi.jpg"
            />
          </div>
          <figcaption>
            <div className="context-photo__principle">
              <span className="micro-label">La propuesta</span>
              <strong>El software se instala en el servidor; cada equipo accede desde el navegador.</strong>
            </div>
            <span className="context-photo__note">Imagen de contexto; no corresponde a una instalación de Aula Remota.</span>
            <a href="https://unsplash.com/photos/students-working-in-school-computer-lab-LKySOH0mr38" target="_blank" rel="noreferrer">
              Foto: Haseeb Modi / Unsplash
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
