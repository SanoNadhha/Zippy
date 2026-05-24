import React from "react";
import Sidebar from "../components/Sidebar";
import ModeCard from "../components/ModeCard";

export default function Modes({
  dark,
  setDark,
  active,
  setActive,
  connected,
  battery,
  currentMode,
  setCurrentMode,
  logs,
  setLogs,
  currentTime,
}) {
  const bg = dark ? "#0D0F14" : "#F4F6FB";
  const text = dark ? "#E8ECF4" : "#0D0F14";
  const sub = dark ? "#8892A4" : "#5A647A";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  const handleOpenMode = (modeName, modeLabel, pageTarget) => {
    if (!connected) return;
    setCurrentMode(modeLabel);
    
    // Log change
    const newLog = {
      text: `Switched to ${modeName}`,
      time: "Just now",
      type: "info",
    };
    setLogs([newLog, ...logs]);

    if (pageTarget) {
      setActive(pageTarget);
    }
  };

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
              letterSpacing: "-0.02em",
              margin: 0,
            }}>Robot Modes</h1>
            <p style={{ color: sub, fontSize: "0.9rem", marginTop: 4 }}>
              Select Zippy's active behavior and configuration.
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
            MODES HUB // {currentTime}
          </div>
        </div>

        {/* Modes Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}>
          {/* Card 1: Voice Mode */}
          <ModeCard
            title="Voice Mode"
            description="Activate Zippy's intelligent voice control system. Interact with children, listen for vocal alerts, and execute natural speech commands."
            icon="🎤"
            active={connected && currentMode.includes("Voice")}
            accentColor="#FF6B6B"
            border={border}
            sub={sub}
            text={text}
            onOpen={() => handleOpenMode("Voice Mode", "🎤 Voice Mode Active", "VoiceMode")}
            openLabel="Open Voice Mode"
          />

          {/* Card 2: Follow Mode */}
          <ModeCard
            title="Follow Mode"
            description="Engage Zippy's BLE child tracking algorithms. The robot uses rssi beacon proximity sensors to follow children automatically at a safe distance."
            icon="🤖"
            active={connected && currentMode.includes("Follow")}
            accentColor="#A78BFA"
            border={border}
            sub={sub}
            text={text}
            onOpen={() => handleOpenMode("Follow Mode", "🤖 Follow Mode Active", "FollowMode")}
            openLabel="Open Follow Mode"
          />

          {/* Card 3: Monitor Mode */}
          <ModeCard
            title="Monitor Mode"
            description="Switch to camera monitoring. View low-latency streams, record clips, and activate real-time object detection overlays."
            icon="📷"
            active={connected && currentMode.includes("Monitor")}
            accentColor="#4ECDC4"
            border={border}
            sub={sub}
            text={text}
            onOpen={() => handleOpenMode("Monitor Mode", "📷 Monitor Mode Active", "LiveMonitor")}
            openLabel="Open Monitor Mode"
          />

          {/* Card 4: Sleep Mode */}
          <ModeCard
            title="Sleep Mode"
            description="Put the robot in standby sleep mode. Stops stream telemetry, silences audio feedback, and reduces power consumption to conserve battery life."
            icon="😴"
            active={connected && currentMode.includes("Sleep")}
            accentColor="#5A647A"
            border={border}
            sub={sub}
            text={text}
            onOpen={() => handleOpenMode("Sleep Mode", "😴 Sleep Mode Active", null)}
            openLabel={connected && currentMode.includes("Sleep") ? "Active" : "Activate Sleep"}
          />
        </div>
      </main>
    </div>
  );
}
