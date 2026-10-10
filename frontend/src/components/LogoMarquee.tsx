const ITEMS = [
  { name: "React.js" },
  { name: "Node.js" },
  { name: "Next.js" },
  { name: "React Native" },
  { name: "Python" },
  { name: "TensorFlow" },
  { name: "OpenAI" },
  { name: "LangChain" },
  { name: "MongoDB" },
  { name: "PostgreSQL" },
  { name: "AWS" },
  { name: "Flutter" },
  { name: "Figma" },
  { name: "Tailwind" },
  { name: "TypeScript" },
  { name: "Docker" },
];

// doubled for seamless loop
const TRACK = [...ITEMS, ...ITEMS];

const LogoMarquee = () => (
  <>
    <style>{`
      @keyframes marquee-rtl {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .logo-track {
        display: flex;
        width: max-content;
        animation: marquee-rtl 30s linear infinite;
        will-change: transform;
      }
      .logo-track:hover { animation-play-state: paused; }
    `}</style>

    <section
      style={{
        background: "#fff",
        borderTop: "1px solid #efefef",
        borderBottom: "1px solid #efefef",
        padding: "22px 0",
        overflow: "hidden" }}
    >
      <div className="logo-track">
        {TRACK.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingLeft: "40px",
              paddingRight: "40px",
              flexShrink: 0 }}
          >
            {/* dot separator */}
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ddd", flexShrink: 0 }} />
            <span
              style={{
                fontSize: "16.5px",
                fontWeight: 600,
                color: "#999",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap" }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default LogoMarquee;
