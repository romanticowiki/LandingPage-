"use client";

import { motion, useReducedMotion } from "motion/react";
import { PixelIcon } from "./PixelIcon";

function RemoteSessionVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="hero-preview"
      aria-label="Ilustración conceptual: el navegador del estudiante se conecta mediante Apache Guacamole con un escritorio XFCE ejecutado en el servidor"
      role="img"
    >
      <div className="hero-preview__label">
        <span aria-hidden="true" />
        Ilustración conceptual del funcionamiento
      </div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="system-flow"
        initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 }}
        transition={{
          duration: reduceMotion ? 0 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="system-flow__node system-flow__node--browser">
          <span className="system-flow__icon"><PixelIcon name="window" size={26} /></span>
          <span className="micro-label">Estudiante</span>
          <strong>Navegador web</strong>
          <p>Muestra el escritorio y envía teclado y mouse.</p>
          <small>lab.aulasremotas.net</small>
        </div>

        <div className="system-flow__connector" aria-hidden="true">
          <span>Acceso web</span>
          <i />
        </div>

        <div className="system-flow__node system-flow__node--gateway">
          <span className="system-flow__icon"><PixelIcon name="network" size={27} /></span>
          <span className="micro-label">Acceso remoto</span>
          <strong>Apache Guacamole</strong>
          <p>Autoriza la conexión y la comunica con el escritorio.</p>
          <small>Caddy · Guacamole · guacd</small>
        </div>

        <div className="system-flow__connector" aria-hidden="true">
          <span>Sesión remota</span>
          <i />
        </div>

        <div className="system-flow__node system-flow__node--server">
          <span className="system-flow__icon"><PixelIcon name="server" size={27} /></span>
          <span className="micro-label">Servidor</span>
          <strong>Escritorio XFCE</strong>
          <p>Ejecuta el entorno y las aplicaciones académicas.</p>
          <small>TigerVNC · AWS EC2</small>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        className="system-flow__legend"
        initial={{ opacity: reduceMotion ? 1 : 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.3, duration: reduceMotion ? 0 : 0.45 }}
      >
        <span><i className="system-flow__signal system-flow__signal--input" />Teclado y mouse</span>
        <span><i className="system-flow__signal system-flow__signal--output" />Imagen del escritorio</span>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="site-shell hero__inner">
        <div className="hero__intro">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="hero__copy"
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="hero__eyebrow">
              <span className="status-dot" />
              Aula Remota · Proyecto en desarrollo
            </div>
            <h1 id="hero-title">Escritorios académicos desde el navegador.</h1>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="hero__summary"
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 }}
            transition={{
              delay: reduceMotion ? 0 : 0.08,
              duration: reduceMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="hero__lede">
              Aula Remota centraliza aplicaciones y escritorios en un servidor. El estudiante usa una computadora con navegador e internet para acceder a su entorno de trabajo.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#como-funciona">
                Conocer cómo funciona
                <PixelIcon name="arrow" size={19} />
              </a>
            </div>
            <p className="availability-note">
              El acceso público aún no está disponible. Esta página explica el proyecto y no solicita credenciales.
            </p>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="hero__visual"
          initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.985 }}
          transition={{
            delay: reduceMotion ? 0 : 0.12,
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <RemoteSessionVisual />
        </motion.div>
      </div>
    </section>
  );
}
