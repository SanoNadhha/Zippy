import React from "react";

const NAV_LINKS = ["Home", "Dashboard", "Modes", "Monitor", "Settings"];

export default function Navbar({ dark, setDark, active, setActive }) {
  const text = dark ? "#E8ECF4" : "#0D0F14";
  const sub = dark ? "#8892A4" : "#5A647A";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const accent = "#4B9EFF";

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: dark ? "rgba(13,15,20,0.85)" : "rgba(244,246,251,0.85)",
      backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${border}`,
      padding: "0 clamp(1rem, 5vw, 3rem)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 60,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: "linear-gradient(135deg, #4B9EFF, #A78BFA)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem",
        }}>🤖</div>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.01em" }}>
          Zippy Robot
        </span>
      </div>

      <div style={{ display: "flex", gap: "1.8rem" }}>
        {NAV_LINKS.map(link => (
          <button
            key={link}
            className={`nav-link${active === link ? " active" : ""}`}
            style={{
              color: active === link ? accent : sub,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onClick={() => setActive(link)}
          >
            {link}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          className="theme-btn"
          style={{
            borderColor: border,
            color: text,
            background: "none",
            border: `1px solid ${border}`,
            borderRadius: "50%",
            width: 32,
            height: 32,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.9rem",
          }}
          onClick={() => setDark(d => !d)}
          aria-label="Toggle Theme"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
