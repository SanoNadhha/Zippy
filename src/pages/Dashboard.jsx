import React from "react";
import Sidebar from "../components/Sidebar";
import StatusCard from "../components/StatusCard";
import CameraFeed from "../components/CameraFeed";
import { FaRobot } from "../icons";
import { FiVideo, FiSettings, FiZap, FiBell, FiMic } from "../icons";

export default function Dashboard({
  dark,
  setDark,
  active,
  setActive,
  connected,
  setConnected,
  battery,
  setBattery,
  currentMode,
  setCurrentMode,
  logs,
  setLogs,
  isStreaming,
  setIsStreaming,
  detectedObject,
  cameraZoom,
  nightVision,
  currentTime,
}) {
  const bg = dark ? "#0D0F14" : "#F4F6FB";
  const surface = dark ? "#161922" : "#FFFFFF";
  const text = dark ? "#E8ECF4" : "#0D0F14";
  const sub = dark ? "#8892A4" : "#5A647A";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const accent = "#4B9EFF";

  // Actions
  const handleStart = () => {
    if (connected) return;
    setConnected(true);
    setBattery(80);
    const newLog = {
      text: "Robot Started",
      time: "Just now",
      type: "info",
    };
    setLogs([newLog, ...logs]);
  };

  const handleStop = () => {
    if (!connected) return;
    setConnected(false);
    const newLog = {
      text: "Robot Stopped",
      time: "Just now",
      type: "warning",
    };
    setLogs([newLog, ...logs]);
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
            }}>Control Center</h1>
            <p style={{ color: sub, fontSize: "0.9rem", marginTop: 4 }}>
              Main control center for Zippy operations.
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
            SYSTEM OK // {currentTime}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.50rem",
        }}>
          {/* Robot Status Card */}
          <StatusCard title="Robot Status" icon={<FaRobot size={18} />} dark={dark}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              flexGrow: 1,
              justifyContent: "center",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: dark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
                padding: "12px 16px",
                borderRadius: "12px",
                border: `1px solid ${border}`,
              }}>
                <span style={{ fontSize: "0.9rem", color: sub }}>Status Badge</span>
                <span style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: connected ? "#4ECDC4" : "#FF6B6B",
                }}>
                  {connected ? "Connected" : "Offline"}
                </span>
              </div>

              <div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.9rem",
                  marginBottom: 6,
                }}>
                  <span style={{ color: sub }}>Battery Level</span>
                  <span style={{ fontWeight: 700 }}>{battery}%</span>
                </div>
                <div style={{
                  width: "100%",
                  height: "8px",
                  background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${battery}%`,
                    height: "100%",
                    background: battery > 20 ? "#4ECDC4" : "#FF6B6B",
                    borderRadius: "4px",
                  }} />
                </div>
              </div>
            </div>
          </StatusCard>

          {/* Camera Preview Card */}
          <StatusCard title="Camera Preview" icon={<FiVideo size={18} />} dark={dark}>
            <div style={{ marginBottom: 12 }}>
              <CameraFeed
                connected={connected}
                nightVision={nightVision}
                zoom={cameraZoom}
                height={160}
                detectedObject={detectedObject}
                dark={dark}
                accent={accent}
                currentTime={currentTime}
              />
            </div>
            <div style={{ fontSize: "0.82rem", color: sub, textAlign: "center" }}>
              Mini camera stream. Access the full telemetry on the Live Monitor.
            </div>
          </StatusCard>

          {/* Current Mode Card */}
          <StatusCard title="Current Mode" icon={<FiSettings size={18} />} dark={dark}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              flexGrow: 1,
              justifyContent: "center",
            }}>
              <div style={{
                background: `${accent}12`,
                border: `1.5px dashed ${accent}33`,
                borderRadius: "14px",
                padding: "20px 16px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}><FiMic /></div>
                <div style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: accent,
                  letterSpacing: "-0.01em",
                }}>
                  {connected ? currentMode : "Standby Mode Active"}
                </div>
              </div>
            </div>
          </StatusCard>

          {/* Quick Buttons Card */}
          <StatusCard title="Quick Buttons" icon={<FiZap size={18} />} dark={dark}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              justifyContent: "center",
              flexGrow: 1,
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <button
                  onClick={handleStart}
                  disabled={!connected}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: 600,
                    cursor: connected ? "pointer" : "not-allowed",
                    background: connected ? "#4ECDC4" : border,
                    color: connected ? "#fff" : sub,
                    opacity: connected ? 1 : 0.6,
                    transition: "transform 0.1s, opacity 0.2s",
                  }}
                >
                  Start
                </button>
                <button
                  onClick={handleStop}
                  disabled={!connected}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: 600,
                    cursor: connected ? "pointer" : "not-allowed",
                    background: connected ? "#FF6B6B" : border,
                    color: connected ? "#fff" : sub,
                    opacity: connected ? 1 : 0.6,
                    transition: "transform 0.1s, opacity 0.2s",
                  }}
                >
                  Stop
                </button>
              </div>
              <button
                onClick={() => setActive("LiveMonitor")}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: `1px solid ${accent}`,
                  background: `${accent}15`,
                  color: accent,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                Open Monitor
              </button>
            </div>
          </StatusCard>

          {/* Notifications / Logs Card */}
          <StatusCard title="Notifications" icon={<FiBell size={18} />} dark={dark}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxHeight: "180px",
              overflowY: "auto",
              paddingRight: 6,
            }}>
              {logs.map((log, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 12px",
                    background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                    border: `1px solid ${border}`,
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: log.type === "success" ? "#4ECDC4" : log.type === "warning" ? "#FF6B6B" : accent,
                    }} />
                    {log.text}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: sub }}>{log.time}</span>
                </div>
              ))}
            </div>
          </StatusCard>
        </div>
      </main>
    </div>
  );
}
