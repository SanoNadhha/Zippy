import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import {
  FiMic,
  FiVideo,
  FiLayers,
  FiStar,
  FiLock,
  FiShield,
} from "../icons";

const FEATURES = [
  {
    icon: <FiMic size={26} />,
    title: "Voice Commands",
    desc: "Natural language processing for seamless child interaction and emergency vocal triggers.",
    color: "#FF6B6B",
    bg: "rgba(255,107,107,0.1)",
  },
  {
    icon: <FiVideo size={26} />,
    title: "Live Monitoring",
    desc: "Crystal clear 4K encrypted streaming to your dashboard with ultra-low latency connection.",
    color: "#4ECDC4",
    bg: "rgba(78,205,196,0.1)",
  },
  {
    icon: <FiLayers size={26} />,
    title: "Child Following",
    desc: "Advanced computer vision allows Zippy to follow and engage children within a safe perimeter.",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.1)",
  },
  {
    icon: <FiStar size={26} />,
    title: "Interactive Modes",
    desc: "Switch between play, education, and safety guard modes with a single click from your app.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
  },
];

const BADGES = [
  { icon: <FiLock size={14} />, label: "Secure Data" },
  { icon: <FiStar size={14} />, label: "AI Powered" },
  { icon: <FiShield size={14} />, label: "Safe Design" },
];

export default function ZippyRobotHome({ dark, setDark, active, setActive }) {
  const [visible, setVisible] = useState(false);
  const [featVisible, setFeatVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const featRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setFeatVisible(true); },
      { threshold: 0.15 }
    );
    if (featRef.current) obs.observe(featRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAboutVisible(true); },
      { threshold: 0.15 }
    );
    if (aboutRef.current) obs.observe(aboutRef.current);
    return () => obs.disconnect();
  }, []);

  const bg = dark ? "#0D0F14" : "#F4F6FB";
  const surface = dark ? "#161922" : "#FFFFFF";
  const surfaceAlt = dark ? "#1C2030" : "#EEF1F8";
  const text = dark ? "#E8ECF4" : "#0D0F14";
  const sub = dark ? "#8892A4" : "#5A647A";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const accent = "#4B9EFF";

  return (
    <div style={{
      minHeight: "100vh",
      background: bg,
      color: text,
      fontFamily: "'DM Sans', 'Nunito', sans-serif",
      transition: "background 0.3s, color 0.3s",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-link {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem; font-weight: 500;
          padding: 0.35rem 0;
          position: relative; transition: color 0.2s;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 2px; background: #4B9EFF;
          transition: width 0.25s;
        }
        .nav-link.active::after, .nav-link:hover::after { width: 100%; }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.05em;
          padding: 5px 14px; border-radius: 100px;
          border: 1px solid;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif; font-weight: 600;
          font-size: 0.95rem; cursor: pointer;
          padding: 12px 24px; border-radius: 10px; border: none;
          background: #4B9EFF; color: #fff;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(75,158,255,0.35); background: #3B8EEF; }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif; font-weight: 600;
          font-size: 0.95rem; cursor: pointer;
          padding: 11px 24px; border-radius: 10px;
          background: transparent; transition: transform 0.2s, background 0.2s;
        }
        .btn-secondary:hover { transform: translateY(-2px); }

        .feat-card {
          border-radius: 16px; padding: 28px 24px;
          transition: transform 0.25s, box-shadow 0.25s;
          border: 1px solid;
        }
        .feat-card:hover { transform: translateY(-6px); }

        .robot-img-wrap {
          position: relative; border-radius: 20px; overflow: hidden;
        }
        .robot-float {
          animation: floatY 3.5s ease-in-out infinite;
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .glow-ring {
          position: absolute; inset: -2px; border-radius: 22px;
          background: conic-gradient(from 0deg, #4B9EFF44, #A78BFA44, #4ECDC444, #4B9EFF44);
          animation: spinRing 8s linear infinite;
          pointer-events: none;
        }
        @keyframes spinRing { to { transform: rotate(360deg); } }

        .fade-up {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-up.in { opacity: 1; transform: translateY(0); }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 800; line-height: 1.05; letter-spacing: -0.02em;
        }

        .about-card {
          border-radius: 20px; padding: 40px 48px;
          border: 1px solid; position: relative; overflow: hidden;
          transition: transform 0.3s;
        }
        .about-card:hover { transform: scale(1.01); }

        .section-chip {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 5px 14px; border-radius: 100px;
          border: 1px solid;
        }

        .theme-btn {
          width: 38px; height: 38px; border-radius: 50%; border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; background: transparent; font-size: 1.1rem;
          transition: transform 0.2s, background 0.2s;
        }
        .theme-btn:hover { transform: rotate(20deg); }

        .avatar-btn {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #4B9EFF, #A78BFA);
          border: none; cursor: pointer;
        }

        .dot-pulse {
          width: 8px; height: 8px; border-radius: 50%; background: #4ECDC4;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        footer a { color: inherit; text-decoration: none; transition: color 0.2s; }
        footer a:hover { color: #4B9EFF; }
      `}</style>

      {/* NAVBAR */}
      <Navbar dark={dark} setDark={setDark} active={active} setActive={setActive} />

      {/* HERO */}
      <section style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "80px clamp(1rem, 5vw, 3rem) 100px",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "3rem", alignItems: "center",
      }}>
        {/* Left */}
        <div>
          <div className={`fade-up${visible ? " in" : ""}`} style={{ transitionDelay: "0s" }}>
            <div className="hero-badge" style={{
              borderColor: `${accent}44`, color: accent,
              background: `${accent}11`, marginBottom: 24,
            }}>
              <div className="dot-pulse" />
              IoT Safety Platform v1.2
            </div>
          </div>

          <div className={`fade-up${visible ? " in" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <h1 className="hero-title" style={{ marginBottom: 20 }}>
              ZIPPY<br />
              <span style={{
                background: "linear-gradient(90deg, #4B9EFF, #A78BFA)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>ROBOT</span>
            </h1>
          </div>

          <div className={`fade-up${visible ? " in" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <p style={{
              fontSize: "1.05rem", lineHeight: 1.7, color: sub,
              maxWidth: 400, marginBottom: 36,
            }}>
              Smart Child Engagement &amp; Safety Robot. Experience the next generation of parental assistance through intelligent AI interactions and real-time monitoring.
            </p>
          </div>

          <div className={`fade-up${visible ? " in" : ""}`}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", transitionDelay: "0.3s" }}>
            <button className="btn-primary" onClick={() => setActive("Dashboard")}>
              [ Open Dashboard ] →
            </button>
            <button className="btn-secondary" style={{
              border: `1.5px solid ${border}`, color: text,
            }} onClick={() => {
              featRef.current?.scrollIntoView({ behavior: "smooth" });
            }}>
              Learn More
            </button>
          </div>
        </div>

        {/* Right — robot illustration */}
        <div className={`fade-up${visible ? " in" : ""}`}
          style={{ transitionDelay: "0.15s", display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "min(420px, 100%)", aspectRatio: "1/1" }}>
            {/* Glow */}
            <div style={{
              position: "absolute", inset: "10%", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(75,158,255,0.18) 0%, transparent 70%)",
              filter: "blur(24px)", animation: "floatY 3.5s ease-in-out infinite",
            }} />
            {/* Robot SVG */}
            <div className="robot-float" style={{
              width: "100%", height: "100%", position: "relative",
              borderRadius: 24, overflow: "hidden",
              background: dark
                ? "linear-gradient(145deg, #1C2030, #161922)"
                : "linear-gradient(145deg, #E8EDF8, #F4F6FB)",
              border: `1px solid ${border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* Decorative grid */}
              <svg style={{ position: "absolute", inset: 0, opacity: 0.06 }} width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke={text} strokeWidth="0.7"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)"/>
              </svg>

              {/* Robot Body */}
              <svg viewBox="0 0 240 300" width="78%" height="78%" xmlns="http://www.w3.org/2000/svg">
                {/* Antenna */}
                <line x1="120" y1="15" x2="120" y2="45" stroke="#4B9EFF" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="120" cy="11" r="6" fill="#4B9EFF">
                  <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                </circle>

                {/* Head */}
                <rect x="60" y="45" width="120" height="100" rx="22" fill={dark ? "#1C2030" : "#DDE3F0"} stroke="#4B9EFF" strokeWidth="1.5"/>

                {/* Eyes */}
                <ellipse cx="95" cy="90" rx="20" ry="20" fill="#0D1421"/>
                <ellipse cx="95" cy="90" rx="14" ry="14" fill="#4B9EFF" opacity="0.9"/>
                <ellipse cx="88" cy="84" rx="4" ry="4" fill="white" opacity="0.6"/>
                {/* Eye ring */}
                {[...Array(8)].map((_, i) => (
                  <circle key={i}
                    cx={95 + 18 * Math.cos((i / 8) * Math.PI * 2)}
                    cy={90 + 18 * Math.sin((i / 8) * Math.PI * 2)}
                    r="2" fill="#4B9EFF" opacity="0.5"
                  />
                ))}

                <ellipse cx="145" cy="90" rx="20" ry="20" fill="#0D1421"/>
                <ellipse cx="145" cy="90" rx="14" ry="14" fill="#4B9EFF" opacity="0.9"/>
                <ellipse cx="138" cy="84" rx="4" ry="4" fill="white" opacity="0.6"/>
                {[...Array(8)].map((_, i) => (
                  <circle key={i}
                    cx={145 + 18 * Math.cos((i / 8) * Math.PI * 2)}
                    cy={90 + 18 * Math.sin((i / 8) * Math.PI * 2)}
                    r="2" fill="#4B9EFF" opacity="0.5"
                  />
                ))}

                {/* Mouth */}
                <rect x="98" y="126" width="44" height="8" rx="4" fill={dark ? "#0D1421" : "#B0BCDA"}/>
                <rect x="102" y="128" width="8" height="4" rx="2" fill="#4ECDC4"/>
                <rect x="116" y="128" width="8" height="4" rx="2" fill="#4ECDC4"/>
                <rect x="130" y="128" width="8" height="4" rx="2" fill="#4ECDC4"/>

                {/* Neck */}
                <rect x="108" y="145" width="24" height="16" rx="4" fill={dark ? "#1C2030" : "#DDE3F0"} stroke={border} strokeWidth="1"/>

                {/* Body */}
                <rect x="45" y="161" width="150" height="110" rx="20" fill={dark ? "#1C2030" : "#DDE3F0"} stroke="#4B9EFF" strokeWidth="1.5"/>

                {/* Chest panel */}
                <rect x="70" y="180" width="100" height="65" rx="12" fill={dark ? "#0D1421" : "#C8D2E8"} stroke={`${accent}33`} strokeWidth="1"/>

                {/* Chest indicators */}
                <circle cx="93" cy="198" r="8" fill="#4ECDC4" opacity="0.85">
                  <animate attributeName="opacity" values="0.85;0.3;0.85" dur="1.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="120" cy="198" r="8" fill="#4B9EFF" opacity="0.85">
                  <animate attributeName="opacity" values="0.85;0.3;0.85" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="147" cy="198" r="8" fill="#A78BFA" opacity="0.85">
                  <animate attributeName="opacity" values="0.85;0.3;0.85" dur="2.5s" repeatCount="indefinite"/>
                </circle>

                {/* Chest bar */}
                <rect x="80" y="218" width="80" height="6" rx="3" fill={dark ? "#1C2030" : "#B0BCDA"}/>
                <rect x="80" y="218" width="52" height="6" rx="3" fill="#4B9EFF" opacity="0.8"/>

                <rect x="80" y="230" width="80" height="6" rx="3" fill={dark ? "#1C2030" : "#B0BCDA"}/>
                <rect x="80" y="230" width="30" height="6" rx="3" fill="#4ECDC4" opacity="0.8"/>

                {/* Arms */}
                <rect x="5" y="165" width="36" height="80" rx="16" fill={dark ? "#1C2030" : "#DDE3F0"} stroke="#4B9EFF" strokeWidth="1.5"/>
                <circle cx="23" cy="255" r="10" fill={dark ? "#161922" : "#C8D2E8"} stroke="#4B9EFF" strokeWidth="1.5"/>

                <rect x="199" y="165" width="36" height="80" rx="16" fill={dark ? "#1C2030" : "#DDE3F0"} stroke="#4B9EFF" strokeWidth="1.5"/>
                <circle cx="217" cy="255" r="10" fill={dark ? "#161922" : "#C8D2E8"} stroke="#4B9EFF" strokeWidth="1.5"/>

                {/* Legs */}
                <rect x="80" y="271" width="34" height="24" rx="10" fill={dark ? "#1C2030" : "#DDE3F0"} stroke="#4B9EFF" strokeWidth="1.5"/>
                <rect x="126" y="271" width="34" height="24" rx="10" fill={dark ? "#1C2030" : "#DDE3F0"} stroke="#4B9EFF" strokeWidth="1.5"/>
              </svg>

              {/* Status badge */}
              <div style={{
                position: "absolute", bottom: 20, right: 20,
                background: dark ? "rgba(13,15,20,0.8)" : "rgba(255,255,255,0.8)",
                border: `1px solid ${border}`,
                backdropFilter: "blur(8px)",
                borderRadius: 10, padding: "6px 12px",
                fontSize: "0.75rem", fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
                color: text,
              }}>
                <div className="dot-pulse" /> Online
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featRef} style={{
        background: surfaceAlt,
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
        padding: "80px clamp(1rem, 5vw, 3rem)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className={`fade-up${featVisible ? " in" : ""}`} style={{ marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)", letterSpacing: "-0.02em",
              marginBottom: 8,
            }}>Smart Safety Features</h2>
            <p style={{ color: sub, fontSize: "0.95rem" }}>Built with precision for peace of mind.</p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
          }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`feat-card fade-up${featVisible ? " in" : ""}`}
                style={{
                  background: surface,
                  borderColor: border,
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: f.bg, color: f.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 18, border: `1px solid ${f.color}33`,
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  fontSize: "1.05rem", marginBottom: 10,
                }}>{f.title}</h3>
                <p style={{ color: sub, fontSize: "0.88rem", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section ref={aboutRef} style={{
        padding: "80px clamp(1rem, 5vw, 3rem)",
        maxWidth: 1200, margin: "0 auto",
      }}>
        <div className={`fade-up${aboutVisible ? " in" : ""}`}
          style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="section-chip" style={{
            borderColor: `${accent}44`, color: accent, background: `${accent}11`,
            marginBottom: 24, display: "inline-flex",
          }}>
            ◎ Our Mission
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)", letterSpacing: "-0.02em",
          }}>Redefining Child-Robot Interaction</h2>
        </div>

        <div className={`about-card fade-up${aboutVisible ? " in" : ""}`}
          style={{
            background: surface, borderColor: border,
            textAlign: "center", transitionDelay: "0.15s",
          }}>
          {/* Decoration */}
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(75,158,255,0.08), transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: -60, left: -60,
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)",
            pointerEvents: "none",
          }} />

          <p style={{
            color: sub, fontSize: "1.02rem", lineHeight: 1.85,
            maxWidth: 700, margin: "0 auto 36px",
          }}>
            Zippy Robot is an advanced IoT platform designed to assist parents and engage children
            through smart tracking, voice interaction, and real-time monitoring. By combining state-of-the-art
            hardware with a warm, approachable design, we create a secure bridge between technology and family
            safety. Our focus is on reliability, engagement, and the seamless integration of AI into the
            modern home.
          </p>

          <div style={{
            borderTop: `1px solid ${border}`, paddingTop: 28,
            display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap",
          }}>
            {BADGES.map(b => (
              <div key={b.label} style={{
                display: "flex", alignItems: "center", gap: 8,
                fontSize: "0.88rem", fontWeight: 600, color: sub,
              }}>
                <span style={{ fontSize: "1.1rem" }}>{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${border}`,
        padding: "24px clamp(1rem, 5vw, 3rem)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
        background: dark ? "rgba(13,15,20,0.9)" : "rgba(244,246,251,0.9)",
      }}>
        <div>
          <div style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "1rem", marginBottom: 4,
          }}>Zippy Robot</div>
          <div style={{ color: sub, fontSize: "0.78rem" }}>© 2024 Zippy Robot v1.2.0</div>
        </div>

        <div style={{ display: "flex", gap: "2rem" }}>
          {["Privacy Policy", "Terms of Service", "Documentation"].map(l => (
            <a key={l} href="#" style={{ fontSize: "0.85rem", color: sub }}>
              {l}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {["◎", "▣", "✕", "⊕"].map(s => (
            <button key={s} style={{
              background: "none", border: `1px solid ${border}`,
              color: sub, width: 30, height: 30, borderRadius: 7,
              cursor: "pointer", fontSize: "0.8rem",
              transition: "color 0.2s, border-color 0.2s",
            }}>{s}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}
