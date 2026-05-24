import React from "react";
import { FiAlertTriangle } from "../icons";

export default function CameraFeed({
  connected = true,
  nightVision = false,
  zoom = 1,
  height = 240,
  detectedObject = null,
  dark = true,
  accent = "#4B9EFF",
  errorColor = "#FF6B6B",
  successColor = "#4ECDC4",
  currentTime = "",
}) {
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{
      width: "100%",
      height: typeof height === "number" ? `${height}px` : height,
      background: "#08090C",
      borderRadius: "14px",
      border: `1px solid ${border}`,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {connected ? (
        <>
          {/* Grid Overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${dark ? "rgba(75,158,255,0.04)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px),
                              linear-gradient(90deg, ${dark ? "rgba(75,158,255,0.04)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
            zIndex: 1,
          }} />

          {/* Night Vision Color Mask */}
          {nightVision && (
            <div style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 255, 100, 0.08)",
              mixBlendMode: "color",
              pointerEvents: "none",
              zIndex: 2,
            }} />
          )}

          {/* Scanning Line */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, height: "2px",
            background: `linear-gradient(to right, transparent, ${nightVision ? successColor : accent}, transparent)`,
            boxShadow: `0 0 8px ${nightVision ? successColor : accent}`,
            animation: "scanline 6s linear infinite",
            zIndex: 3,
          }} />

          {/* Camera Frame Viewport Container (Applies zoom scale) */}
          <div style={{
            transform: `scale(${zoom})`,
            transition: "transform 0.3s ease",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            inset: 0,
          }}>
            {/* Futuristic Scanning Reticle */}
            <svg width="120" height="120" viewBox="0 0 100 100" style={{
              opacity: 0.35,
              color: nightVision ? successColor : accent,
            }}>
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="5 5" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            </svg>

            {/* Object Detection Target Box Overlay */}
            {detectedObject && (
              <div style={{
                position: "absolute",
                width: "140px",
                height: "140px",
                border: `2px solid ${successColor}`,
                boxShadow: `0 0 12px ${successColor}55`,
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "6px",
                fontFamily: "monospace",
                fontSize: "0.7rem",
                color: "#fff",
                background: "rgba(78, 205, 196, 0.08)",
                animation: "pulseRed 2s infinite ease-in-out",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ background: successColor, padding: "2px 4px", borderRadius: 4, fontWeight: "bold" }}>
                    {detectedObject.toUpperCase()}
                  </span>
                  <span>98% CONF</span>
                </div>
                {/* Bounding box corner markers */}
                <div style={{ display: "flex", justifyContent: "space-between", color: successColor, fontSize: "0.8rem", fontWeight: "bold" }}>
                  <span>└</span>
                  <span>┘</span>
                </div>
              </div>
            )}
          </div>

          {/* Flashing REC indicator */}
          <div style={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(0,0,0,0.65)",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#fff",
            zIndex: 4,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: errorColor,
              animation: "pulseRed 1.5s infinite",
            }} />
            REC
          </div>

          {/* Time & Mode Info Overlay */}
          <div style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(0,0,0,0.65)",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: nightVision ? successColor : "#fff",
            fontFamily: "monospace",
            zIndex: 4,
          }}>
            LIVE {currentTime ? `// ${currentTime}` : ""}
          </div>

          {/* Camera Details Bottom Overlay */}
          <div style={{
            position: "absolute",
            bottom: 12,
            left: 16,
            right: 16,
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.72rem",
            fontFamily: "monospace",
            background: "rgba(0,0,0,0.55)",
            padding: "6px 12px",
            borderRadius: "6px",
            backdropFilter: "blur(4px)",
            zIndex: 4,
          }}>
            <span>CAM_01 / OUTDOOR_FRONT</span>
            <span>100% SECURE SSL</span>
          </div>
        </>
      ) : (
        <div style={{
          textAlign: "center",
          color: "#5A647A",
          zIndex: 10,
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 8 }}><FiAlertTriangle /></div>
          <h4 style={{ color: "#E8ECF4", fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>NO SIGNAL</h4>
          <p style={{ fontSize: "0.8rem", color: "#8892A4", marginTop: 4 }}>Stream offline. Robot is currently in standby mode.</p>
        </div>
      )}
    </div>
  );
}
