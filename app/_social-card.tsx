export function SocialCard() {
  return (
    <div
      style={{
        alignItems: "stretch",
        background: "#fcfcf9",
        color: "#0b2026",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 82px",
        position: "relative",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, fontWeight: 700 }}>
        <div style={{ display: "flex", width: 30, height: 30, flexWrap: "wrap", gap: 4 }}>
          <span style={{ width: 13, height: 13, background: "#00b4d8" }} />
          <span style={{ width: 13, height: 13, background: "#ff6b6b" }} />
          <span style={{ width: 13, height: 13, background: "#ff6b6b" }} />
          <span style={{ width: 13, height: 13, background: "#00b4d8" }} />
        </div>
        <span>Aula Remota</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 940 }}>
        <span style={{ color: "#006b7c", fontSize: 20, letterSpacing: 3, textTransform: "uppercase" }}>
          Proyecto en desarrollo · RFD Innovations
        </span>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -3.5, lineHeight: 1.02 }}>
          Escritorios académicos desde el navegador.
        </div>
        <div style={{ color: "#476167", fontSize: 27, lineHeight: 1.45 }}>
          El servidor ejecuta las aplicaciones y el navegador muestra el escritorio remoto.
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 20, color: "#60777c" }}>
        <span>aulasremotas.net</span>
        <span style={{ color: "#ff8585" }}>Un producto de RFD Innovations</span>
      </div>
    </div>
  );
}
