import type { Metadata } from "next";
import Link from "next/link";
import { ProductMark } from "@/components/ProductMark";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página solicitada no existe en Aula Remota.",
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-page__card">
        <ProductMark />
        <span className="section-index">Error 404</span>
        <h1>Página no encontrada.</h1>
        <p>La dirección puede haber cambiado o no formar parte de este sitio.</p>
        <Link className="button button--primary" href="/">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
