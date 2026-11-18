# Informe técnico de preparación para producción

Fecha de verificación: 18 de noviembre de 2026.

## Arquitectura

- Next.js 16.4.6 y React 19.3.1 con App Router.
- Server Components por defecto; solo `Header`, `Hero`, `Interfaces`, `FrequentlyAsked` y `SessionJourney` son cliente porque usan estado, eventos o Motion.
- Estructura raíz `app/`, `components/`, `lib/`, `public/` y `tests/`; no se movió a `src/` porque es una convención opcional y no aporta valor en este tamaño.
- Se añadieron rutas nativas de Next para robots, sitemap y 404, sin `vercel.json` ni exportación estática forzada.
- No se detectaron archivos duplicados, llamadas a AWS, endpoints, secretos, logs de depuración ni recursos remotos cargados en runtime.

Dependencias de aplicación conservadas: Next, React, React DOM y Motion. Se añadieron Playwright y axe-core como dependencias de desarrollo. No se realizaron actualizaciones mayores.

`npm ci` muestra un aviso de fin de soporte para ESLint 9.39.5. Se probó ESLint 10.15.0, pero tres plugins incluidos por `eslint-config-next` 16.4.6 todavía declaran compatibilidad máxima con ESLint 9 y dejan un árbol de pares inválido. Se conserva la última versión 9 compatible hasta que Next.js actualice esos plugins; Dependabot vigilará la actualización. El aviso no corresponde a una vulnerabilidad y `npm audit` permanece en cero.

## Optimización y recursos

- `next/image` mantiene dimensiones y optimización responsive para la fotografía y el logotipo.
- La fotografía fuente mide 1800 × 1200 y 337 380 bytes; el logotipo fuente mide 912 × 912 y 587 923 bytes. Next.js entrega variantes AVIF/WebP adaptadas al viewport.
- Las fuentes se autohospedan mediante `next/font`; no hay scripts, fuentes o imágenes de terceros en la carga.
- El movimiento usa transformaciones y opacidad, respeta movimiento reducido y no crea overflow horizontal durante transiciones.
- La transferencia total medida por Lighthouse fue de 327 KiB en escritorio y 307 KiB en móvil; 207 KiB corresponden a JavaScript compartido, 57 KiB a fuentes y 42/22 KiB a imágenes optimizadas.

Lighthouse 13.6.0, Chrome 159, servidor de producción local en Windows y Node.js 24:

| Perfil | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Escritorio | 100 | 100 | 100 | 100 | 0.2 s | 0.6 s | 0 ms | 0 |
| Móvil simulado | 96 | 100 | 100 | 100 | 0.8 s | 2.8 s | 70 ms | 0 |

Son mediciones de laboratorio, no datos reales de usuarios. Lighthouse no produce INP de campo; TBT se usa únicamente como señal de laboratorio.

## Seguridad

Se revisaron XSS e inyección, exposición de información, navegación, rutas, dependencias, cabeceras HTTP, clickjacking, recursos externos y comportamiento con JavaScript desactivado. Se añadieron CSP, HSTS, `nosniff`, política de referente y permisos, serialización segura de JSON-LD, CodeQL y Dependabot.

`npm audit --audit-level=high` reporta cero vulnerabilidades conocidas en el árbol completo de dependencias. `npm audit signatures` verificó 404 firmas del registro y 92 attestations. El análisis de riesgos y las decisiones de cabeceras están documentados en `SECURITY.md`.

## Pruebas

La suite contiene 25 pruebas Playwright en Chromium. Cubre navegación, CTA, menú móvil, tabs con teclado, FAQ, enlaces externos, footer, recursos, consola e hidratación, movimiento reducido, 404, cabeceras, SEO, robots, sitemap, imagen social, JSON-LD, URL adversarial, JavaScript desactivado, axe-core, seis viewports, foco, skip link y zoom simulado al 200 %.

Viewports: 320, 390, 768, 1024, 1440 y 1920 px. No se detectan violaciones automáticas WCAG A/AA ni overflow horizontal.

## Vercel

El proyecto usa el preset estándar de Next.js, Node.js 24.x, `npm ci` y `npm run build`. No requiere variables de entorno ni configuración personalizada. El dominio de la landing y el subdominio del laboratorio deben conectarse posteriormente desde las cuentas autorizadas; esta auditoría no modifica DNS, AWS o Vercel.
