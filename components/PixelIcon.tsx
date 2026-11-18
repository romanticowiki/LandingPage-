type PixelIconName =
  | "arrow"
  | "close"
  | "menu"
  | "network"
  | "server"
  | "tools"
  | "window";

type PixelIconProps = {
  name: PixelIconName;
  className?: string;
  size?: number;
};

const sharedProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  strokeWidth: 1.75,
  vectorEffect: "non-scaling-stroke" as const,
};

export function PixelIcon({ name, className, size = 24 }: PixelIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {name === "arrow" && (
        <path {...sharedProps} d="M5 12h13m-5-5 5 5-5 5" />
      )}
      {name === "close" && (
        <path {...sharedProps} d="m6 6 12 12M18 6 6 18" />
      )}
      {name === "menu" && (
        <path {...sharedProps} d="M4 7h16M4 12h16M4 17h16" />
      )}
      {name === "network" && (
        <>
          <path {...sharedProps} d="M7 7h10v6H7zM4 17h6v3H4zM14 17h6v3h-6zM12 13v2M7 15h10M7 15v2M17 15v2" />
          <path d="M9 9h2v2H9zM13 9h2v2h-2z" fill="currentColor" />
        </>
      )}
      {name === "server" && (
        <>
          <path {...sharedProps} d="M5 4h14v6H5zM5 14h14v6H5z" />
          <path d="M8 6h2v2H8zM8 16h2v2H8z" fill="currentColor" />
          <path {...sharedProps} d="M13 7h3M13 17h3" />
        </>
      )}
      {name === "tools" && (
        <>
          <path {...sharedProps} d="m5 19 7-7M8 5l3 3-3 3-3-3zM14 14l5 5M14 6l4-2 2 2-2 4-3 1-2-2z" />
        </>
      )}
      {name === "window" && (
        <>
          <path {...sharedProps} d="M3 5h18v14H3zM3 9h18" />
          <path d="M6 6.5h1.5V8H6zM9 6.5h1.5V8H9z" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
