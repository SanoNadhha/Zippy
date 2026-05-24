import React from "react";

export default function StatusCard({
  title,
  icon,
  children,
  dark = true,
}) {
  const surface = dark ? "#161922" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const text = dark ? "#E8ECF4" : "#0D0F14";
  const accent = "#4B9EFF";

  return (
    <div
      className="widget-card"
      style={{
        background: surface,
        border: `1px solid ${border}`,
        borderRadius: "20px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
      }}
    >
      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: "1.1rem",
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: text,
      }}>
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}
