export const navigation = [
  { label: "El problema", href: "#el-problema" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Usuarios", href: "#usuarios" },
  { label: "Preguntas", href: "#preguntas" },
] as const;

export const outcomes = [
  {
    number: "01",
    title: "Mantenimiento centralizado.",
    body: "Las herramientas se instalan y actualizan en el servidor, en lugar de repetir el proceso en cada computadora.",
  },
  {
    number: "02",
    title: "Menos trabajo para el equipo local.",
    body: "La computadora muestra la sesión y envía el teclado y el mouse; el servidor ejecuta las aplicaciones.",
  },
  {
    number: "03",
    title: "Un entorno común para la clase.",
    body: "Cada estudiante accede al escritorio autorizado para su cuenta, con una configuración administrada desde el servidor.",
  },
] as const;

export const journeySteps = [
  {
    number: "01",
    eyebrow: "Estudiante",
    title: "Inicia sesión en el navegador",
    body: "Guacamole muestra las conexiones autorizadas. Si la cuenta solo tiene una, puede abrirla directamente.",
    tag: "lab.aulasremotas.net",
  },
  {
    number: "02",
    eyebrow: "Acceso remoto",
    title: "Conecta con el escritorio autorizado",
    body: "Apache Guacamole valida las conexiones disponibles y guacd establece la comunicación con el escritorio elegido.",
    tag: "Apache Guacamole · guacd",
  },
  {
    number: "03",
    eyebrow: "Servidor",
    title: "Ejecuta el entorno académico",
    body: "TigerVNC mantiene un escritorio XFCE con las aplicaciones configuradas en la instancia del laboratorio.",
    tag: "TigerVNC · XFCE · AWS EC2",
  },
  {
    number: "04",
    eyebrow: "Navegador",
    title: "Muestra la sesión remota",
    body: "El navegador recibe la imagen del escritorio y envía las acciones del estudiante. Caddy protege el acceso web con HTTPS.",
    tag: "Caddy · HTTPS",
  },
] as const;

export const faqs = [
  {
    question: "¿Ya puedo utilizar el laboratorio?",
    answer:
      "No. El acceso público todavía no está disponible. Cuando se habilite, el laboratorio estará en lab.aulasremotas.net.",
  },
  {
    question: "¿Necesito instalar un programa?",
    answer:
      "El acceso está diseñado para funcionar desde un navegador compatible. Los requisitos finales se confirmarán después de las pruebas del laboratorio.",
  },
  {
    question: "¿Puedo acceder desde una computadora con pocos recursos?",
    answer:
      "El servidor realiza el procesamiento principal y la computadora muestra la sesión. Aun así, el rendimiento depende del navegador, la conexión, la capacidad del servidor y la cantidad de sesiones activas. Las pruebas definirán los requisitos mínimos.",
  },
  {
    question: "¿Necesito conexión a internet?",
    answer:
      "Sí. El navegador necesita una conexión estable para enviar las acciones del estudiante y recibir la imagen del escritorio remoto.",
  },
  {
    question: "¿Para qué sirve la aplicación administrativa?",
    answer:
      "Permite al personal responsable consultar recursos, servicios, sesiones y alertas, además de observar un escritorio cuando sea necesario. Es independiente del acceso del estudiante.",
  },
] as const;

export const studentPanel = {
  label: "Acceso del estudiante",
  title: "Abre el escritorio desde el navegador.",
  body: "Después de iniciar sesión, Guacamole muestra las conexiones autorizadas o abre directamente la única disponible. El escritorio se usa en la misma pestaña.",
  note: "Maqueta fiel basada en Apache Guacamole y el escritorio XFCE configurado.",
} as const;

export const supervisorPanel = {
  label: "Aplicación administrativa",
  title: "Supervisa el laboratorio desde una app separada.",
  body: "Docentes y administradores consultan recursos, servicios, sesiones y alertas. En Sesiones pueden observar un escritorio y, después de confirmarlo, tomar el control.",
  note: "Maqueta fiel basada en la aplicación actual; los valores son de muestra.",
} as const;
