"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { faqs } from "@/lib/content";

export function FrequentlyAsked() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="faq-section" id="preguntas" aria-labelledby="faq-title">
      <div className="site-shell faq-section__grid">
        <div className="faq-section__intro">
          <span className="section-index">06 / Preguntas frecuentes</span>
          <h2 id="faq-title">Preguntas sobre el acceso y el proyecto.</h2>
          <p>
            Respuestas directas sobre el funcionamiento previsto y lo que todavía debe validarse.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            const answerId = `faq-answer-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div className="faq-item" key={faq.question}>
                <h3>
                  <button
                    aria-controls={answerId}
                    aria-expanded={isOpen}
                    id={buttonId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    type="button"
                  >
                    <span>{faq.question}</span>
                    <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
                  </button>
                </h3>
                <motion.div
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  aria-hidden={!isOpen}
                  aria-labelledby={buttonId}
                  className="faq-answer"
                  id={answerId}
                  initial={false}
                  role="region"
                  transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
