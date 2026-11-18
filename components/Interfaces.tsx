"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { KeyboardEvent, useRef, useState } from "react";
import { studentPanel, supervisorPanel } from "@/lib/content";
import { PixelIcon } from "./PixelIcon";

const tabs = ["Estudiante", "Docente o administrador"] as const;

function StudentMockup() {
  return (
    <div
      aria-label="Maqueta fiel de un escritorio XFCE abierto en el navegador mediante Apache Guacamole"
      className="student-mockup"
      role="img"
    >
      <div className="browser-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        <div>lab.aulasremotas.net</div>
      </div>
      <div className="xfce-desktop" aria-hidden="true">
        <div className="xfce-panel">
          <span><i />Aplicaciones</span>
          <strong>PC-Alumno-1</strong>
          <span>10:24</span>
        </div>
        <div className="xfce-desktop__icons">
          {["Papelera", "Sistema de archivos", "Inicio"].map((label, index) => (
            <div key={label}>
              <i className={`xfce-desktop__icon xfce-desktop__icon--${index + 1}`} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="xfce-session-note">
          <span>Sesión remota</span>
          <strong>Escritorio XFCE</strong>
          <small>Se abre en esta pestaña</small>
        </div>
        <div className="xfce-dock">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function SupervisorMockup() {
  const sessions = ["PC-Alumno-1", "PC-Maestro-1"];

  return (
    <div
      aria-label="Maqueta fiel de la pestaña Sesiones de la aplicación administrativa de Aula Remota"
      className="supervisor-mockup"
      role="img"
    >
      <div className="phone-frame" aria-hidden="true">
        <div className="phone-frame__sensor" />
        <div className="phone-frame__content">
          <div className="phone-frame__header">
            <div>
              <strong>Sesiones</strong>
              <small>Quién está conectado ahora</small>
            </div>
            <span className="phone-frame__settings">•••</span>
          </div>
          <div className="service-summary">
            <span className="service-summary__icon"><PixelIcon name="window" size={18} /></span>
            <strong>Escritorios en uso</strong>
            <span className="service-summary__value">0 <small>/ 2</small></span>
          </div>
          <div className="service-list">
            {sessions.map((session) => (
              <div key={session}>
                <span className="service-list__icon"><PixelIcon name="window" size={16} /></span>
                <div>
                  <strong>{session}</strong>
                  <small>Escritorio disponible</small>
                </div>
                <span className="service-list__status">Libre</span>
              </div>
            ))}
          </div>
          <div className="phone-navigation">
            {["Inicio", "Sistema", "Sesiones", "Alertas"].map((item) => (
              <span className={item === "Sesiones" ? "is-active" : undefined} key={item}>
                <i />{item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="supervisor-notes">
        <span className="micro-label">Funciones actuales</span>
        <p>La app reúne Inicio, Sistema, Sesiones y Alertas. La vista de sesiones permite observar un escritorio antes de solicitar el control.</p>
      </div>
    </div>
  );
}

export function Interfaces() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const panel = active === 0 ? studentPanel : supervisorPanel;

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === index) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="interfaces-section" id="usuarios" aria-labelledby="interfaces-title">
      <div className="site-shell">
        <div className="section-heading section-heading--interfaces">
          <span className="section-index">04 / Usuarios e interfaces</span>
          <div>
            <h2 id="interfaces-title">Cada persona usa una interfaz distinta.</h2>
            <p>
              El navegador da acceso al escritorio del estudiante. La aplicación administrativa reúne la información que necesita el personal responsable.
            </p>
          </div>
        </div>

        <div className="interface-tabs" role="tablist" aria-label="Elegir interfaz">
          {tabs.map((tab, index) => (
            <button
              aria-controls={`interface-panel-${index}`}
              aria-selected={active === index}
              id={`interface-tab-${index}`}
              key={tab}
              onClick={() => setActive(index)}
              onKeyDown={(event) => moveTab(event, index)}
              ref={(element) => { tabRefs.current[index] = element; }}
              role="tab"
              tabIndex={active === index ? 0 : -1}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {tab}
            </button>
          ))}
        </div>

        <div className={`interface-stage interface-stage--${active === 0 ? "student" : "supervisor"}`}>
          <div className="interface-stage__copy">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                key={panel.label}
                transition={{ duration: reduceMotion ? 0 : 0.24 }}
              >
                <span className="micro-label">{panel.label}</span>
                <h3>{panel.title}</h3>
                <p>{panel.body}</p>
              </motion.div>
            </AnimatePresence>
            <div className="concept-note">
              <PixelIcon name="tools" size={21} />
              <span>{panel.note}</span>
            </div>
          </div>

          {[0, 1].map((panelIndex) => (
            <div
              aria-labelledby={`interface-tab-${panelIndex}`}
              className="interface-stage__panel"
              hidden={active !== panelIndex}
              id={`interface-panel-${panelIndex}`}
              key={panelIndex}
              role="tabpanel"
              tabIndex={active === panelIndex ? 0 : -1}
            >
              {active === panelIndex && (
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: reduceMotion ? 0 : 18 }}
                  key={active}
                  transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  {panelIndex === 0 ? <StudentMockup /> : <SupervisorMockup />}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
