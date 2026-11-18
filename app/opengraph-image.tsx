import { ImageResponse } from "next/og";
import { SocialCard } from "./_social-card";

export const alt = "Aula Remota — Escritorios académicos desde el navegador";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard />, size);
}
