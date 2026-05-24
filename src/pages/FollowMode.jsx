import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatusCard from "../components/StatusCard";

export default function FollowMode({
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
  isFollowing,
  setIsFollowing,
  bleConnected,
  setBleConnected,
  distance,
  setDistance,
  currentTime,
}) {
  const bg = dark ? "#0D0F14" : "#F4F6FB";
  const surface = dark ? "#161922" : "#FFFFFF";
  const text = dark ? "#E8ECF4" : "#0D0F14";
  const sub = dark ? "#8892A4" : "#5A647A";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const accent = "#A78BFA"; // Special follow mode accent

  // Simulating RSSI distance fluctuation when following is active
  useEffect(() => {
    if (!connected || !isFollowing || !bleConnected) return;

    const interval = setInterval(() => {
      setDistance((prev) => {
        // Fluctuate between 0.8m and 2.4m
        const change = (Math.random() - 0.5) * 0.4;
        const newDist = Math.max(0.6, Math.min(3.0, prev + change));
        return parseFloat(newDist.toFixed(1));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [connected, isFollowing, bleConnected]);

  const handleStartFollow = () => {
    if (!connected) return;
    setIsFollowing(true);
    const newLog = {
      text: "Following Child Initialized",
      time: "Just now",
      type: "success",
    };
    setLogs([newLog, ...logs]);
  };

  const handleStopFollow = () => {
    if (!connected) return;
    setIsFollowing(false);
    const newLog = {
      text: "Child tracking suspended",
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
            }}>Follow Mode</h1>
            <p style={{ color: sub, fontSize: "0.9rem", marginTop: 4 }}>
              Proximity child tracking &amp; safety perimeter control.
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
            BLE TRACKER // {currentTime}
          </div>
        </div>

        {/* Follow Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.50rem",
        }}>
          {/* Status Display Card */}
          <StatusCard title="Follow Status" icon="🤖" dark={dark}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              justifyContent: "center",
              flexGrow: 1,
            }}>
              <div style={{
                background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                border: `1px solid ${border}`,
                borderRadius: "12px",
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "0.9rem", color: sub }}>Status Mode</span>
                <span style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: (connected && isFollowing && bleConnected) ? "#4ECDC4" : "#FF6B6B",
                }}>
                  {!connected
                    ? "Offline"
                    : !bleConnected
                    ? "Watch Offline"
                    : isFollowing
                    ? "Following Child"
                    : "Tracking Suspended"}
                </span>
              </div>

              <div style={{
                background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                border: `1px solid ${border}`,
                borderRadius: "12px",
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "0.9rem", color: sub }}>BLE Connection</span>
                <button
                  onClick={() => connected && setBleConnected(b => !b)}
                  disabled={!connected}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: (connected && bleConnected) ? "#4ECDC4" : "#FF6B6B",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    cursor: connected ? "pointer" : "not-allowed",
                    padding: 0,
                    textDecoration: "underline",
                  }}
                  title="Click to toggle watch connection simulator"
                >
                  {connected && bleConnected ? "BLE Watch Connected" : "BLE Watch Disconnected"}
                </button>
              </div>
            </div>
          </StatusCard>

          {/* Distance Indicator Card */}
          <StatusCard title="Distance Indicator" icon="📏" dark={dark}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              padding: "16px 0",
            }}>
              {/* Distance Display Dial */}
              <div style={{
                width: 130,
                height: 130,
                borderRadius: "50%",
                border: `3px solid ${border}`,
                borderTopColor: (connected && isFollowing && bleConnected) ? accent : border,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: dark ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.01)",
                boxShadow: (connected && isFollowing && bleConnected) ? `0 0 20px ${accent}22` : "none",
                animation: (connected && isFollowing && bleConnected) ? "pulseRed 3s infinite" : "none",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}>
                <span style={{ fontSize: "0.78rem", color: sub }}>Distance</span>
                <span style={{
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  fontFamily: "monospace",
                  color: (connected && isFollowing && bleConnected) ? text : sub,
                  marginTop: 2,
                }}>
                  {connected && bleConnected ? `${distance.toFixed(1)}m` : "---"}
                </span>
              </div>
              <p style={{ color: sub, fontSize: "0.78rem", marginTop: 12, textAlign: "center", maxWidth: 220 }}>
                Live RSSI signal path attenuation estimate. Safe perimeter threshold: 3.5m.
              </p>
            </div>
          </StatusCard>

          {/* Follow Controls Card */}
          <StatusCard title="Follow Controls" icon="⚙️" dark={dark}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              justifyContent: "center",
              flexGrow: 1,
            }}>
              <button
                onClick={handleStartFollow}
                disabled={!connected || !bleConnected || isFollowing}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: (connected && bleConnected && !isFollowing) ? "pointer" : "not-allowed",
                  background: (connected && bleConnected && !isFollowing) ? accent : border,
                  color: (connected && bleConnected && !isFollowing) ? "#fff" : sub,
                  opacity: (connected && bleConnected && !isFollowing) ? 1 : 0.6,
                  transition: "background 0.2s",
                }}
              >
                [ Start Following ]
              </button>
              <button
                onClick={handleStopFollow}
                disabled={!connected || !isFollowing}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  border: `1.5px solid ${connected ? "#FF6B6B" : border}`,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: (connected && isFollowing) ? "pointer" : "not-allowed",
                  background: "transparent",
                  color: connected ? "#FF6B6B" : sub,
                  opacity: (connected && isFollowing) ? 1 : 0.6,
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                [ Stop Following ]
              </button>
            </div>
          </StatusCard>
        </div>
      </main>
    </div>
  );
}
