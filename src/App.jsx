import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Modes from "./pages/Modes";
import VoiceMode from "./pages/VoiceMode";
import FollowMode from "./pages/FollowMode";
import LiveMonitor from "./pages/LiveMonitor";
import Settings from "./pages/Settings";

export default function App() {
  const [active, setActive] = useState("Home");
  const [dark, setDark] = useState(true);

  // Unified Robot States
  const [connected, setConnected] = useState(true);
  const [battery, setBattery] = useState(80);
  const [currentMode, setCurrentMode] = useState("Voice Mode Active");
  const [logs, setLogs] = useState([
    { text: "Camera Connected", time: "Just now", type: "success" },
    { text: "Robot Started", time: "2 mins ago", type: "info" },
    { text: "Secure stream initialized", time: "5 mins ago", type: "success" },
  ]);

  // Unified Camera & Live Monitor States
  const [isStreaming, setIsStreaming] = useState(true);
  const [detectedObject, setDetectedObject] = useState("Bottle");
  const [fps, setFps] = useState(30);
  const [cameraZoom, setCameraZoom] = useState(1);
  const [nightVision, setNightVision] = useState(false);

  // Unified Voice Mode States
  const [voiceActive, setVoiceActive] = useState(false);
  const [lastCommand, setLastCommand] = useState("Move Forward");
  const [voiceResponse, setVoiceResponse] = useState("Moving Forward");

  // Unified Follow Mode States
  const [isFollowing, setIsFollowing] = useState(true);
  const [bleConnected, setBleConnected] = useState(true);
  const [distance, setDistance] = useState(1.2);

  // Real-time Clock
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Shared props bundle to make page definitions clean and consistent
  const sharedProps = {
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
    setDetectedObject,
    fps,
    setFps,
    cameraZoom,
    setCameraZoom,
    nightVision,
    setNightVision,
    voiceActive,
    setVoiceActive,
    lastCommand,
    setLastCommand,
    voiceResponse,
    setVoiceResponse,
    isFollowing,
    setIsFollowing,
    bleConnected,
    setBleConnected,
    distance,
    setDistance,
    currentTime,
  };

  const renderActivePage = () => {
    switch (active) {
      case "Home":
        return <Home dark={dark} setDark={setDark} active={active} setActive={setActive} />;
      case "Dashboard":
        return <Dashboard {...sharedProps} />;
      case "Modes":
        return <Modes {...sharedProps} />;
      case "VoiceMode":
        return <VoiceMode {...sharedProps} />;
      case "FollowMode":
        return <FollowMode {...sharedProps} />;
      case "LiveMonitor":
        return <LiveMonitor {...sharedProps} />;
      case "Settings":
        return <Settings {...sharedProps} />;
      default:
        return <Home dark={dark} setDark={setDark} active={active} setActive={setActive} />;
    }
  };

  return (
    <div className={dark ? "dark-theme" : "light-theme"}>
      {renderActivePage()}
    </div>
  );
}
