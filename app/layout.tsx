import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aulasremotas.net"),
  applicationName: "Aula Remota",
  title: {
    default: "Aula Remota | Escritorios académicos desde el navegador",
    template: "%s | Aula Remota",
  },
  description:
    "Conoce Aula Remota, el proyecto de RFD Innovations para acceder a escritorios y aplicaciones académicas desde un navegador.",
  alternates: { canonical: "https://aulasremotas.net/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "Aula Remota",
    title: "Aula Remota | Escritorios académicos desde el navegador",
    description:
      "Un proyecto de RFD Innovations que centraliza escritorios académicos en un servidor para acceder desde el navegador.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aula Remota | Escritorios académicos desde el navegador",
    description:
      "Conoce cómo un estudiante accede a un escritorio remoto y qué funciones utiliza el personal responsable.",
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fcfcf9",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={`${manrope.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
