import React from "react";

const NAV_ITEMS = [
  { id: "Home", label: "Back to Home", icon: "🏠" },
  { id: "Dashboard", label: "Dashboard", icon: "📊" },
  { id: "Modes", label: "Modes Hub", icon: "🎮" },
  { id: "VoiceMode", label: "Voice Mode", icon: "🎤" },
  { id: "FollowMode", label: "Follow Mode", icon: "🤖" },
  { id: "LiveMonitor", label: "Live Monitor", icon: "🎥" },
  { id: "Settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar({
  dark,
  setDark,
  active,
  setActive,
  connected = true,
  battery = 80,
  currentMode = "Voice Mode Active",
}) {
  const bg = dark ? "#0F111A" : "#FFFFFF";
  const surface = dark ? "#161922" : "#F4F6FB";
  const text = dark ? "#E8ECF4" : "#0D0F14";
  const sub = dark ? "#8892A4" : "#5A647A";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const accent = "#4B9EFF";

  return (
    <aside style={{
      width: "280px",
      height: "100vh",
      background: bg,
      borderRight: `1px solid ${border}`,
      display: "flex",
      flexDirection: "column",
      position: "sticky",
      top: 0,
      left: 0,
      padding: "24px 20px",
      boxSizing: "border-box",
      fontFamily: "'DM Sans', sans-serif",
      color: text,
      zIndex: 90,
      flexShrink: 0,
      transition: "background 0.3s, border-color 0.3s",
    }}>
      {/* Brand Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 28,
        paddingLeft: 6,
      }}>
        <div style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: "linear-gradient(135deg, #4B9EFF, #A78BFA)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          boxShadow: `0 4px 12px ${accent}22`,
        }}>🤖</div>
        <div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.15rem",
            letterSpacing: "-0.01em",
            margin: 0,
          }}>Zippy Robot</h2>
          <span style={{
            fontSize: "0.72rem",
            color: accent,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}>Control Panel</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        flexGrow: 1,
        overflowY: "auto",
        paddingRight: 4,
        marginBottom: 16,
      }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "10px 14px",
                border: "none",
                borderRadius: "10px",
                background: isActive ? `${accent}15` : "transparent",
                color: isActive ? accent : sub,
                fontFamily: "inherit",
                fontSize: "0.9rem",
                fontWeight: isActive ? 600 : 500,
                textAlign: "left",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* System Status Panel */}
      <div style={{
        background: surface,
        border: `1px solid ${border}`,
        borderRadius: "16px",
        padding: "14px",
        marginBottom: 16,
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}>
          <span style={{ fontSize: "0.78rem", color: sub, fontWeight: 500 }}>System State</span>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.75rem",
            fontWeight: 600,
            color: connected ? "#4ECDC4" : "#FF6B6B",
          }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: connected ? "#4ECDC4" : "#FF6B6B",
              display: "inline-block",
              boxShadow: connected ? "0 0 6px #4ECDC4" : "0 0 6px #FF6B6B",
            }} />
            {connected ? "Connected" : "Offline"}
          </div>
        </div>

        {/* Battery Indicator */}
        <div style={{ marginBottom: 10 }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.78rem",
            color: sub,
            marginBottom: 4,
          }}>
            <span>Battery</span>
            <span style={{ fontWeight: 600, color: text }}>{battery}%</span>
          </div>
          <div style={{
            width: "100%",
            height: "5px",
            background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
            borderRadius: "3px",
            overflow: "hidden",
          }}>
            <div style={{
              width: `${battery}%`,
              height: "100%",
              background: battery > 20 ? "#4ECDC4" : "#FF6B6B",
              borderRadius: "3px",
              transition: "width 0.5s ease",
            }} />
          </div>
        </div>

        {/* Active Mode indicator */}
        <div style={{
          fontSize: "0.75rem",
          color: text,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: dark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.5)",
          padding: "6px 8px",
          borderRadius: "6px",
          border: `1px solid ${border}`,
        }}>
          <span>🎤</span>
          <span style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {connected ? currentMode : "Standby Mode"}
          </span>
        </div>
      </div>

      {/* Footer Controls / Theme Toggle */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: `1px solid ${border}`,
        paddingTop: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4B9EFF, #A78BFA)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.85rem",
            color: "#fff",
            fontWeight: 700,
          }}>P</div>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: 600 }}>Parent Account</div>
            <div style={{ fontSize: "0.65rem", color: sub }}>Admin Mode</div>
          </div>
        </div>

        <button
          onClick={() => setDark(d => !d)}
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            border: `1px solid ${border}`,
            background: "transparent",
            color: text,
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s, background 0.2s",
          }}
          aria-label="Toggle Theme"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </aside>
  );
}
