import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatusCard from "../components/StatusCard";

export default function VoiceMode({
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
  voiceActive,
  setVoiceActive,
  lastCommand,
  setLastCommand,
  voiceResponse,
  setVoiceResponse,
  currentTime,
}) {
  const bg = dark ? "#0D0F14" : "#F4F6FB";
  const surface = dark ? "#161922" : "#FFFFFF";
  const text = dark ? "#E8ECF4" : "#0D0F14";
  const sub = dark ? "#8892A4" : "#5A647A";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const accent = "#FF6B6B"; // Special voice mode accent

  const [isListening, setIsListening] = useState(false);

  const simulateSpeechSynthesis = (phrase) => {
    if ("speechSynthesis" in window) {
      // Create text to speech instance
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = 1.0;
      utterance.pitch = 1.2; // Robot voice pitch
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCommand = (cmdText, responseText) => {
    if (!connected) return;
    setLastCommand(cmdText);
    setVoiceResponse(responseText);
    
    // Add to logs
    const newLog = {
      text: `Voice command: "${cmdText}"`,
      time: "Just now",
      type: "success",
    };
    setLogs([newLog, ...logs]);

    // Speak it
    simulateSpeechSynthesis(responseText);
  };

  const handleStartListening = () => {
    if (!connected || isListening) return;
    setIsListening(true);
    setLastCommand("Listening...");
    setVoiceResponse("...");

    // Simulated speech delay
    setTimeout(() => {
      const commands = [
        { cmd: "Move Forward", resp: "Moving Forward" },
        { cmd: "Turn Left", resp: "Turning Left" },
        { cmd: "Turn Right", resp: "Turning Right" },
        { cmd: "Stop", resp: "Stopping all movements" },
        { cmd: "Tell a Joke", resp: "Why did the robot cross the road? To follow the child safely!" },
        { cmd: "Sing a Song", resp: "Beep boop, la la la, Zippy is here!" }
      ];
      const selected = commands[Math.floor(Math.random() * commands.length)];
      setLastCommand(selected.cmd);
      setVoiceResponse(selected.resp);
      
      const newLog = {
        text: `Recognized Command: "${selected.cmd}"`,
        time: "Just now",
        type: "success",
      };
      setLogs([newLog, ...logs]);
      setIsListening(false);

      // Speech synthesis
      simulateSpeechSynthesis(selected.resp);
    }, 2000);
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
            }}>Voice Mode</h1>
            <p style={{ color: sub, fontSize: "0.9rem", marginTop: 4 }}>
              Interact and issue verbal safety overrides.
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
            VOICE CONTROLLER // {currentTime}
          </div>
        </div>

        {/* Voice grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          {/* Voice Command Button Card */}
          <StatusCard title="Voice Assistant Triggers" icon="🎙️" dark={dark}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              gap: 16,
              padding: "20px 0",
            }}>
              <button
                onClick={handleStartListening}
                disabled={!connected || isListening}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  border: "none",
                  background: isListening ? "rgba(255, 107, 107, 0.2)" : `${accent}15`,
                  color: accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  cursor: connected && !isListening ? "pointer" : "not-allowed",
                  boxShadow: isListening ? "0 0 25px #FF6B6Baa" : "none",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
              >
                {isListening && (
                  <div style={{
                    position: "absolute",
                    inset: -10,
                    borderRadius: "50%",
                    border: `2px solid ${accent}`,
                    animation: "pulseRed 1.5s infinite",
                  }} />
                )}
                🎙️
              </button>

              <h4 style={{ margin: 0, fontWeight: 700 }}>
                {isListening ? "Listening..." : "Click to Start Listening"}
              </h4>
              <p style={{ color: sub, fontSize: "0.8rem", textAlign: "center", maxWidth: 240 }}>
                Simulates voice command matching from Zippy's microphone sensors.
              </p>
            </div>
          </StatusCard>

          {/* Speech Command State */}
          <StatusCard title="Command Status" icon="💬" dark={dark}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              justifyContent: "center",
              flexGrow: 1,
            }}>
              {/* Recognized Command */}
              <div style={{
                background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                border: `1px solid ${border}`,
                borderRadius: "12px",
                padding: "16px",
              }}>
                <span style={{ fontSize: "0.78rem", color: sub, textTransform: "uppercase", fontWeight: 600 }}>
                  Recognized Command
                </span>
                <div style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  marginTop: 6,
                  color: isListening ? accent : text,
                }}>
                  {lastCommand ? `"${lastCommand}"` : "No command yet"}
                </div>
              </div>

              {/* Voice Response */}
              <div style={{
                background: `${accent}0a`,
                border: `1.5px dashed ${accent}33`,
                borderRadius: "12px",
                padding: "16px",
              }}>
                <span style={{ fontSize: "0.78rem", color: accent, textTransform: "uppercase", fontWeight: 600 }}>
                  Voice Response
                </span>
                <div style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  marginTop: 6,
                }}>
                  {voiceResponse ? `"${voiceResponse}"` : "Standby"}
                </div>
              </div>
            </div>
          </StatusCard>

          {/* Manual Control Overrides */}
          <StatusCard title="Command Shortcuts" icon="🕹️" dark={dark}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              justifyContent: "center",
              flexGrow: 1,
            }}>
              <p style={{ color: sub, fontSize: "0.8rem", margin: 0 }}>
                Manual click overrides to test command simulation templates:
              </p>

              {/* Direction Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                maxWidth: 260,
                margin: "0 auto",
                width: "100%",
              }}>
                <div />
                <button
                  onClick={() => handleCommand("Move Forward", "Moving Forward")}
                  disabled={!connected}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: `1px solid ${border}`,
                    background: surface,
                    color: text,
                    cursor: connected ? "pointer" : "not-allowed",
                    fontWeight: "bold",
                  }}
                  title="Forward"
                >
                  ▲
                </button>
                <div />

                <button
                  onClick={() => handleCommand("Turn Left", "Turning Left")}
                  disabled={!connected}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: `1px solid ${border}`,
                    background: surface,
                    color: text,
                    cursor: connected ? "pointer" : "not-allowed",
                    fontWeight: "bold",
                  }}
                  title="Left"
                >
                  ◀
                </button>
                <button
                  onClick={() => handleCommand("Stop", "Stopping operations")}
                  disabled={!connected}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#FF6B6B",
                    color: "#fff",
                    cursor: connected ? "pointer" : "not-allowed",
                    fontWeight: "bold",
                  }}
                  title="Stop"
                >
                  ■
                </button>
                <button
                  onClick={() => handleCommand("Turn Right", "Turning Right")}
                  disabled={!connected}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: `1px solid ${border}`,
                    background: surface,
                    color: text,
                    cursor: connected ? "pointer" : "not-allowed",
                    fontWeight: "bold",
                  }}
                  title="Right"
                >
                  ▶
                </button>
              </div>
            </div>
          </StatusCard>
        </div>
      </main>
    </div>
  );
}
