# Aula Remota — landing oficial

Sitio público de Aula Remota, un producto de RFD Innovations que explica cómo se ofrecerán escritorios académicos desde el navegador. La landing es informativa: no autentica personas, no recibe credenciales y no se conecta con AWS ni con el laboratorio.

## Tecnologías y requisitos

- Next.js 16 con App Router y React 19.
- TypeScript 5, Tailwind CSS 3 y Motion.
- Node.js 24.x y npm con `package-lock.json`.
- Playwright y axe-core para pruebas funcionales, responsive y WCAG.

## Instalación y ejecución

```bash
npm ci
npm run dev
```

El servidor de desarrollo queda disponible en `http://localhost:3000`.

Producción local:

```bash
npm run build
npm run start
```

## Validaciones

```bash
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
npm audit --audit-level=high
```

`npm run check` ejecuta TypeScript, ESLint, build y las pruebas de navegador. El build debe existir antes de `npm run test:e2e` porque Playwright valida el servidor de producción.

## Organización

```text
app/          Rutas, metadatos, estilos, robots, sitemap y 404
components/   Secciones y controles de la landing
lib/          Contenido estable y utilidades seguras
public/       Fotografía y logotipo
tests/        Pruebas Playwright y axe-core
.github/      CI, CodeQL y Dependabot
```

La carpeta `src/` es opcional en Next.js. Se conserva la estructura raíz porque el proyecto es pequeño y mover todo no aporta una mejora funcional.

## Diseño y contenido

- Colores oficiales: `#00B4D8` y `#FF6B6B`.
- Manrope para lectura e IBM Plex Mono para etiquetas técnicas.
- El logotipo original de RFD Innovations se conserva sin sustitución.
- Las maquetas se identifican como conceptuales y el acceso al laboratorio permanece deshabilitado.
- `prefers-reduced-motion` elimina el movimiento no esencial.

Las atribuciones de recursos están en [ASSET-LICENSES.md](./ASSET-LICENSES.md). Las decisiones y riesgos de seguridad están en [SECURITY.md](./SECURITY.md), y la evidencia de auditoría en [AUDIT-REPORT.md](./AUDIT-REPORT.md).

## Publicación en Vercel

1. Importar `romanticowiki/LandingPage-` en Vercel.
2. Mantener el preset detectado de Next.js, el comando `npm run build` y Node.js 24.x.
3. Asignar `aulasremotas.net` a la landing cuando la configuración de dominio esté autorizada.
4. Configurar `lab.aulasremotas.net` por separado para el laboratorio.

No se requiere `vercel.json`, exportación estática forzada ni variables de entorno. La landing y el laboratorio AWS son servicios separados; este repositorio no contiene credenciales ni automatiza DNS, AWS, Guacamole o Vercel.

## Límites actuales

- `lab.aulasremotas.net` todavía no se presenta como acceso público disponible.
- Las maquetas no consumen datos productivos.
- Los requisitos finales de red y navegador se confirmarán con las pruebas del laboratorio.
