import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatusCard from "../components/StatusCard";
import { FiVideo, FiWifi, FiAlertTriangle, FiShield } from "../icons";
import { GiBrain, GiJoystick } from "../icons";
import CameraFeed from "../components/CameraFeed";

export default function LiveMonitor({
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
  isStreaming,
  setIsStreaming,
  detectedObject,
  setDetectedObject,
  fps,
  setFps,
  cameraZoom,
  setCameraZoom,
  nightVision,
  setNightVision,
  currentTime,
}) {
  const bg = dark ? "#0D0F14" : "#F4F6FB";
  const surface = dark ? "#161922" : "#FFFFFF";
  const text = dark ? "#E8ECF4" : "#0D0F14";
  const sub = dark ? "#8892A4" : "#5A647A";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const accent = "#4ECDC4"; // Surveillance / Monitor Mode accent
  const errorColor = "#FF6B6B";

  const [isRecording, setIsRecording] = useState(false);
  const [flashScreen, setFlashScreen] = useState(false);

  const handleCapture = () => {
    if (!connected || !isStreaming) return;
    setFlashScreen(true);
    setTimeout(() => setFlashScreen(false), 150);

    const snapshotLog = {
      text: `Snapshot captured: CAM_01_${Math.floor(Math.random() * 9000 + 1000)}.jpg`,
      time: "Just now",
      type: "success",
    };
    setLogs([snapshotLog, ...logs]);
  };

  const handleRecord = () => {
    if (!connected || !isStreaming) return;
    const nextState = !isRecording;
    setIsRecording(nextState);

    const recordingLog = {
      text: nextState ? "Video recording started" : "Video recording saved to storage",
      time: "Just now",
      type: nextState ? "info" : "success",
    };
    setLogs([recordingLog, ...logs]);
  };

  const handleStartStream = () => {
    if (!connected || isStreaming) return;
    setIsStreaming(true);
    setFps(30);
    const newLog = {
      text: "Camera stream started",
      time: "Just now",
      type: "info",
    };
    setLogs([newLog, ...logs]);
  };

  const handleStopStream = () => {
    if (!connected || !isStreaming) return;
    setIsStreaming(false);
    setIsRecording(false);
    setFps(0);
    const newLog = {
      text: "Camera stream stopped",
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
      position: "relative",
    }}>
      {/* Photo Capture flash effect */}
      {flashScreen && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "#fff",
          opacity: 0.9,
          zIndex: 1000,
          pointerEvents: "none",
        }} />
      )}

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
            }}>Live Monitor</h1>
            <p style={{ color: sub, fontSize: "0.9rem", marginTop: 4 }}>
              Full camera surveillance and computer vision analysis.
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
            VIDEO STREAM // {currentTime}
          </div>
        </div>

        {/* Layout Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2.2fr 1fr",
          gap: "1.50rem",
          alignItems: "start",
        }}>
          {/* Column 1: Video Surveillance */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <StatusCard title="Full Camera Stream" icon={<FiVideo size={18} />} dark={dark}>
              <div style={{ position: "relative" }}>
                <CameraFeed
                  connected={connected && isStreaming}
                  nightVision={nightVision}
                  zoom={cameraZoom}
                  height={320}
                  detectedObject={detectedObject}
                  dark={dark}
                  accent={accent}
                  currentTime={currentTime}
                />
                {isRecording && connected && isStreaming && (
                  <div style={{
                    position: "absolute",
                    top: 16,
                    left: 90,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(0,0,0,0.65)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: errorColor,
                    zIndex: 4,
                  }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: errorColor,
                      animation: "pulseRed 1s infinite",
                    }} />
                    RECORDING ACTIVE
                  </div>
                )}
              </div>
            </StatusCard>

            {/* Video Controls Panel */}
            <StatusCard title="Camera Controls" icon={<GiJoystick size={18} />} dark={dark}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: 12,
              }}>
                <button
                  onClick={handleStartStream}
                  disabled={!connected || isStreaming}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: 600,
                    cursor: (connected && !isStreaming) ? "pointer" : "not-allowed",
                    background: (connected && !isStreaming) ? accent : border,
                    color: (connected && !isStreaming) ? "#fff" : sub,
                  }}
                >
                  Start Stream
                </button>
                <button
                  onClick={handleStopStream}
                  disabled={!connected || !isStreaming}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: `1px solid ${connected && isStreaming ? errorColor : border}`,
                    fontWeight: 600,
                    cursor: (connected && isStreaming) ? "pointer" : "not-allowed",
                    background: "transparent",
                    color: (connected && isStreaming) ? errorColor : sub,
                  }}
                >
                  Stop Stream
                </button>
                <button
                  onClick={handleCapture}
                  disabled={!connected || !isStreaming}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: `1.5px solid ${border}`,
                    fontWeight: 600,
                    cursor: (connected && isStreaming) ? "pointer" : "not-allowed",
                    background: surface,
                    color: text,
                  }}
                >
                  Capture
                </button>
                <button
                  onClick={handleRecord}
                  disabled={!connected || !isStreaming}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: 600,
                    cursor: (connected && isStreaming) ? "pointer" : "not-allowed",
                    background: isRecording ? errorColor : border,
                    color: isRecording ? "#fff" : text,
                  }}
                >
                  {isRecording ? "Stop Record" : "Record"}
                </button>
              </div>
            </StatusCard>
          </div>

          {/* Column 2: Parameters & Telemetry */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Stream Telemetry */}
            <StatusCard title="Stream Status" icon={<FiWifi size={18} />} dark={dark}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.88rem", color: sub }}>Frames Per Second</span>
                  <span style={{ fontWeight: "bold", fontFamily: "monospace", color: isStreaming ? "#4ECDC4" : sub }}>
                    {connected && isStreaming ? `${fps} FPS` : "0 FPS"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.88rem", color: sub }}>Surveillance State</span>
                  <span style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: (connected && isStreaming) ? "#4ECDC4" : sub,
                  }}>
                    {connected && isStreaming ? "Monitoring Active" : "Suspended"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.88rem", color: sub }}>Night Vision Filter</span>
                  <button
                    onClick={() => connected && setNightVision(v => !v)}
                    disabled={!connected}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 6,
                      border: `1.5px solid ${nightVision ? "#4ECDC4" : border}`,
                      background: nightVision ? "rgba(78, 205, 196, 0.15)" : "transparent",
                      color: nightVision ? "#4ECDC4" : text,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: connected ? "pointer" : "not-allowed",
                    }}
                  >
                    {nightVision ? "ON" : "OFF"}
                  </button>
                </div>
              </div>
            </StatusCard>

            {/* Object Detection */}
            <StatusCard title="Object Detection" icon={<GiBrain size={18} />} dark={dark}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: "0.82rem", color: sub }}>Simulated AI Target Class:</span>
                <select
                  value={detectedObject || ""}
                  onChange={(e) => setDetectedObject(e.target.value || null)}
                  disabled={!connected || !isStreaming}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: surface,
                    color: text,
                    border: `1px solid ${border}`,
                    borderRadius: "8px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="">None (Clear Vision)</option>
                  <option value="Bottle">Bottle</option>
                  <option value="Person">Person</option>
                  <option value="Toy Car">Toy Car</option>
                  <option value="Dog">Dog</option>
                </select>
                <div style={{
                  fontSize: "0.8rem",
                  color: sub,
                  background: dark ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.02)",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  marginTop: 4,
                  lineHeight: 1.4,
                }}>
                  Detected: <strong style={{ color: detectedObject ? "#4ECDC4" : text }}>
                    {detectedObject || "No targets within viewport"}
                  </strong>
                </div>
              </div>
            </StatusCard>

            {/* Alerts */}
            <StatusCard title="Alerts" icon={<FiAlertTriangle size={18} />} dark={dark}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {battery < 25 && (
                  <div style={{
                    background: "rgba(255,107,107,0.12)",
                    border: "1px solid #FF6B6B",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "0.8rem",
                    color: "#FF6B6B",
                    fontWeight: 600,
                  }}>
                    Battery Low: {battery}% remaining.
                  </div>
                )}
                {connected && isStreaming && (
                  <div style={{
                    background: "rgba(78,205,196,0.12)",
                    border: "1px solid #4ECDC4",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "0.8rem",
                    color: "#4ECDC4",
                    fontWeight: 600,
                  }}>
                    Camera Active: Secure stream encrypted.
                  </div>
                )}
                {!connected && (
                  <div style={{
                    background: "rgba(255,107,107,0.12)",
                    border: "1px solid #FF6B6B",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "0.8rem",
                    color: "#FF6B6B",
                    fontWeight: 600,
                  }}>
                    🔴 Camera Offline: Connection lost.
                  </div>
                )}
              </div>
            </StatusCard>
          </div>
        </div>
      </main>
    </div>
  );
}
