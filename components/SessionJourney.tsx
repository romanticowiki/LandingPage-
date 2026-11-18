"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { journeySteps } from "@/lib/content";

export function SessionJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.72", "end 0.42"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 30,
    mass: 0.28,
  });

  return (
    <section
      className="journey-section"
      id="como-funciona"
      ref={sectionRef}
      aria-labelledby="journey-title"
    >
      <div className="site-shell">
        <div className="journey-section__intro">
          <span className="section-index">03 / Cómo funciona</span>
          <div>
            <h2 id="journey-title">Así accede un estudiante</h2>
            <p>
              Primero, la persona inicia sesión y abre el escritorio autorizado. Después, la infraestructura mantiene la conexión con el servidor.
            </p>
          </div>
        </div>

        <div className="journey-route">
          <span className="journey-route__base journey-route__base--horizontal" aria-hidden="true" />
          <motion.span
            className="journey-route__progress journey-route__progress--horizontal"
            style={{ scaleX: reduceMotion ? 1 : progress }}
            aria-hidden="true"
          />
          <span className="journey-route__base journey-route__base--vertical" aria-hidden="true" />
          <motion.span
            className="journey-route__progress journey-route__progress--vertical"
            style={{ scaleY: reduceMotion ? 1 : progress }}
            aria-hidden="true"
          />

          <ol className="journey-steps">
            {journeySteps.map((step) => (
              <li className="journey-step" key={step.number}>
                <span className="journey-step__node" aria-hidden="true">{step.number}</span>
                <span className="journey-step__eyebrow">{step.eyebrow}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="journey-step__tag">{step.tag}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
