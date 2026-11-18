# Seguridad

## Alcance y modelo de amenazas

La aplicación es una landing pública sin formularios, autenticación, API, base de datos, cookies ni contenido aportado por visitantes. Los activos principales son la integridad del contenido, la marca de RFD Innovations, la privacidad de quien visita el sitio y la cadena de suministro del build.

Superficies revisadas:

- Respuestas HTTP y ejecución de JavaScript en el navegador.
- Parámetros de URL, fragmentos, metadatos y JSON-LD.
- Dependencias npm, scripts de instalación y workflows.
- Enlaces externos, rutas inexistentes, imágenes y archivos públicos.
- Repositorio, archivos ignorados, variables de entorno y patrones de secretos.

El laboratorio, AWS, Guacamole, DNS y Vercel quedan fuera del alcance de esta landing. No existen endpoints locales que justifiquen pruebas de autenticación, SQL, subida de archivos o control de acceso.

## Controles aplicados

- CSP con `default-src 'self'`, bloqueo de objetos y `frame-ancestors 'none'`.
- HSTS por un año sin `includeSubDomains`, para no imponer política sobre el laboratorio separado.
- `nosniff`, `strict-origin-when-cross-origin`, política de permisos y defensa heredada contra marcos.
- Recursos servidos desde el mismo origen; sin scripts de analítica ni CDN de terceros.
- Serialización segura de JSON-LD para impedir el cierre de un elemento `script` si el contenido se vuelve dinámico.
- Enlaces externos HTTPS con aislamiento de la pestaña de origen.
- 404 con `noindex` automático de Next.js, robots y sitemap explícitos.
- GitHub Actions con permisos mínimos, CodeQL y Dependabot.
- `.env*`, artefactos de build, resultados de pruebas y configuración local de Vercel ignorados por Git.

## Hallazgos y riesgos residuales

| Severidad | Hallazgo | Estado |
| --- | --- | --- |
| Media | Faltaban CSP y cabeceras defensivas; el sitio podía embeberse en un marco. | Corregido y cubierto por Playwright. |
| Media | Contraste insuficiente en tres textos pequeños de maquetas. | Corregido; axe-core no reporta violaciones A/AA. |
| Baja | El JSON-LD se insertaba con `JSON.stringify` sin escapar caracteres de HTML. El contenido actual era estático. | Endurecido con serialización segura y prueba de regresión. |
| Baja | Faltaban 404 propia, robots y sitemap. | Corregido y probado. |

La CSP conserva `'unsafe-inline'` para scripts y estilos porque la hidratación de Next.js y los estilos de Motion lo requieren en esta arquitectura estática. El riesgo residual es bajo al no existir contenido dinámico ni entradas de usuario, pero debe reevaluarse si se agregan formularios, CMS, analítica o datos remotos.

## Reporte responsable

No publiques secretos ni pruebas ofensivas en un issue público. Informa al propietario del repositorio con la ruta afectada, impacto, pasos mínimos de reproducción y una propuesta de mitigación.
