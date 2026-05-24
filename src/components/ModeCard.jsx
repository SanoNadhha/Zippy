import React from "react";

export default function ModeCard({
  title,
  description,
  icon,
  active = false,
  connected = true,
  accentColor = "#4B9EFF",
  border = "rgba(255,255,255,0.07)",
  sub = "#8892A4",
  text = "#E8ECF4",
  surfaceAlt = "#1C2030",
  onOpen = () => {},
  openLabel = "Open",
}) {
  return (
    <div
      className="widget-card"
      style={{
        border: `1px solid ${active ? accentColor : border}`,
        boxShadow: active ? `0 8px 30px ${accentColor}18` : "none",
        background: "rgba(255,255,255,0.01)",
        borderRadius: "20px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: `${accentColor}1c`, color: accentColor,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.5rem"
        }}>
          {icon}
        </div>
        {active && (
          <span style={{
            fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase",
            padding: "4px 10px", borderRadius: 100, background: `${accentColor}25`, color: accentColor
          }}>
            Active
          </span>
        )}
      </div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: 8, color: text }}>
        {title}
      </h3>
      <p style={{ color: sub, fontSize: "0.88rem", lineHeight: 1.6, flexGrow: 1, marginBottom: 20 }}>
        {description}
      </p>
      <button
        onClick={onOpen}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
          background: active ? accentColor : border,
          color: active ? "#fff" : text,
          cursor: "pointer",
          transition: "background 0.2s, transform 0.1s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
        }}
      >
        {openLabel}
      </button>
    </div>
  );
}
