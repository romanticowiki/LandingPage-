"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/content";
import { PixelIcon } from "./PixelIcon";
import { ProductMark } from "./ProductMark";

export function Header() {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-shell site-header__inner">
        <a className="brand-link" href="#contenido-principal" aria-label="Aula Remota, inicio">
          <ProductMark />
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <span className="header-status">
            <span className="status-dot" aria-hidden="true" />
            En desarrollo
          </span>
          <button
            aria-controls={open ? "menu-movil" : undefined}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="menu-trigger"
            onClick={() => setOpen((value) => !value)}
            ref={triggerRef}
            type="button"
          >
            <PixelIcon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1 }}
            className="mobile-menu__backdrop"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            <motion.nav
              animate={{ y: 0, opacity: 1 }}
              aria-label="Navegación móvil"
              className="mobile-menu"
              exit={{ y: reduceMotion ? 0 : -18, opacity: 0 }}
              id="menu-movil"
              initial={{ y: reduceMotion ? 0 : -18, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="micro-label">Explorar el proyecto</span>
              {navigation.map((item, index) => (
                <a
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                  ref={index === 0 ? firstLinkRef : undefined}
                >
                  <span>{item.label}</span>
                  <PixelIcon name="arrow" size={20} />
                </a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
