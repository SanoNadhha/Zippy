import React from "react";
import Sidebar from "../components/Sidebar";
import StatusCard from "../components/StatusCard";

export default function Settings({
  dark,
  setDark,
  active,
  setActive,
  connected,
  battery,
  currentMode,
  currentTime,
}) {
  const bg = dark ? "#0D0F14" : "#F4F6FB";
  const text = dark ? "#E8ECF4" : "#0D0F14";
  const sub = dark ? "#8892A4" : "#5A647A";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const accent = "#4B9EFF";

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: bg,
      color: text,
      fontFamily: "'DM Sans', sans-serif",
      transition: "background 0.3s, color 0.3s",
    }}>
      <Sidebar
        dark={dark}
        setDark={setDark}
        active={active}
        setActive={setActive}
        connected={connected}
        battery={battery}
        currentMode={currentMode}
      />

      <main style={{
        flexGrow: 1,
        padding: "40px clamp(1.5rem, 5vw, 3rem)",
        overflowY: "auto",
        boxSizing: "border-box",
      }}>
        {/* Top Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
          borderBottom: `1px solid ${border}`,
          paddingBottom: 20,
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "2rem",
              margin: 0,
            }}>Settings</h1>
            <p style={{ color: sub, fontSize: "0.9rem", marginTop: 4 }}>
              Simple configuration settings panel.
            </p>
          </div>
          <div style={{
            fontSize: "0.85rem",
            color: sub,
            background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            padding: "8px 16px",
            borderRadius: "10px",
            border: `1px solid ${border}`,
            fontFamily: "monospace",
          }}>
            SETTINGS // {currentTime}
          </div>
        </div>

        {/* Settings Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.50rem",
        }}>
          {/* Theme Toggle Card */}
          <StatusCard title="Theme Toggle" icon="⚙️" dark={dark}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              justifyContent: "center",
              flexGrow: 1,
            }}>
              <p style={{ color: sub, fontSize: "0.85rem", margin: 0 }}>
                Toggle the default visual theme theme styles:
              </p>
              <button
                onClick={() => setDark(d => !d)}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  border: `1px solid ${border}`,
                  background: dark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                  color: text,
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "background 0.2s",
                }}
              >
                {dark ? (
                  <>
                    <span>🌙</span>
                    Dark Mode Active
                  </>
                ) : (
                  <>
                    <span>☀️</span>
                    Light Mode Active
                  </>
                )}
              </button>
            </div>
          </StatusCard>

          {/* App Info Card */}
          <StatusCard title="App Info" icon="ℹ️" dark={dark}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              justifyContent: "center",
              flexGrow: 1,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${border}`, paddingBottom: 8 }}>
                <span style={{ color: sub, fontSize: "0.88rem" }}>Device Model</span>
                <span style={{ fontWeight: 600 }}>Zippy Robot</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${border}`, paddingBottom: 8 }}>
                <span style={{ color: sub, fontSize: "0.88rem" }}>Software Version</span>
                <span style={{ fontWeight: 600 }}>1.0</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: sub, fontSize: "0.88rem" }}>Build Release</span>
                <span style={{ fontWeight: 600, color: "#4ECDC4" }}>Stable</span>
              </div>
            </div>
          </StatusCard>
        </div>
      </main>
    </div>
  );
}
