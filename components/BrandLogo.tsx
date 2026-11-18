import Image from "next/image";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-logo ${className}`}>
      <Image
        alt="RFD Innovations"
        className="brand-logo__image"
        height={912}
        priority={false}
        src="/rfd-innovations-logo.png"
        width={912}
      />
    </span>
  );
}
