import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export const HERO_IMG_ID    = "morph-hero-img";
export const SERVICE_IMG_ID = "morph-service-img";
export const ABOUT_IMG_ID   = "morph-about-img";

interface Rect { top: number; left: number; width: number; height: number; borderRadius: number }

const getRect = (id: string): Rect | null => {
  const el = document.getElementById(id);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return {
    top: r.top + window.scrollY,
    left: r.left,
    width: r.width,
    height: r.height,
    borderRadius: parseFloat(window.getComputedStyle(el).borderRadius) || 16,
  };
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface CardStyle {
  top: number; left: number; width: number; height: number;
  borderRadius: number; rotateY: number; opacity: number; zIndex: number;
}

const ScrollImageMorph = () => {
  const [rects, setRects] = useState<{ hero: Rect | null; service: Rect | null; about: Rect | null }>({
    hero: null, service: null, about: null,
  });
  const [style, setStyle] = useState<CardStyle>({
    top: 0, left: 0, width: 0, height: 0,
    borderRadius: 16, rotateY: 0, opacity: 0, zIndex: 50,
  });
  const [phase, setPhase] = useState<"hero" | "service" | "about">("hero");
  const [morphImgs, setMorphImgs] = useState({ portrait: "", back: "" });
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    apiFetch("/api/site-images")
      .then(r => r.json())
      .then(data => setMorphImgs({
        portrait: data.morph_portrait || "",
        back:     data.morph_back     || "",
      }))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const measure = () => {
      setRects({
        hero:    getRect(HERO_IMG_ID),
        service: getRect(SERVICE_IMG_ID),
        about:   getRect(ABOUT_IMG_ID),
      });
    };
    // wait for layout
    const t = setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, []);

  useEffect(() => {
    if (!rects.hero || !rects.service || !rects.about) return;

    const { hero, service, about } = rects;

    // init at hero
    setStyle({
      top: hero.top, left: hero.left,
      width: hero.width, height: hero.height,
      borderRadius: hero.borderRadius,
      rotateY: 0, opacity: 1, zIndex: 50,
    });

    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const p1Start = hero.top + hero.height - vh * 0.6;
      const p1End   = service.top - vh * 0.2;
      const p2Start = service.top + service.height - vh * 0.6;
      const p2End   = about.top - vh * 0.2;

      if (scrollY <= p1Start) {
        setPhase("hero");
        setStyle({
          top: hero.top, left: hero.left,
          width: hero.width, height: hero.height,
          borderRadius: hero.borderRadius,
          rotateY: 0, opacity: 1, zIndex: 50,
        });
      } else if (scrollY <= p1End) {
        const t = (scrollY - p1Start) / (p1End - p1Start);
        setPhase(t > 0.5 ? "service" : "hero");
        setStyle({
          top:          lerp(hero.top,    service.top,    t),
          left:         lerp(hero.left,   service.left,   t),
          width:        lerp(hero.width,  service.width,  t),
          height:       lerp(hero.height, service.height, t),
          borderRadius: lerp(hero.borderRadius, service.borderRadius, t),
          rotateY:      t * 180,
          opacity: 1, zIndex: 50,
        });
      } else if (scrollY <= p2Start) {
        setPhase("service");
        setStyle({
          top: service.top, left: service.left,
          width: service.width, height: service.height,
          borderRadius: service.borderRadius,
          rotateY: 180, opacity: 1, zIndex: 50,
        });
      } else if (scrollY <= p2End) {
        const t = (scrollY - p2Start) / (p2End - p2Start);
        setPhase(t > 0.5 ? "about" : "service");
        setStyle({
          top:          lerp(service.top,    about.top,    t),
          left:         lerp(service.left,   about.left,   t),
          width:        lerp(service.width,  about.width,  t),
          height:       lerp(service.height, about.height, t),
          borderRadius: lerp(service.borderRadius, about.borderRadius, t),
          rotateY:      180 + t * 180,
          opacity: 1, zIndex: 50,
        });
      } else {
        // arrived at about — stay here, never disappear
        setPhase("about");
        setStyle({
          top: about.top, left: about.left,
          width: about.width, height: about.height,
          borderRadius: about.borderRadius,
          rotateY: 360, opacity: 1, zIndex: 50,
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [rects]);

  if (isMobile || !rects.hero || style.opacity === 0) return null;

  const imgSrc = phase === "service" ? morphImgs.back : morphImgs.portrait;

  return (
    <div
      style={{
        position: "absolute",
        top: style.top,
        left: style.left,
        width: style.width,
        height: style.height,
        borderRadius: style.borderRadius,
        opacity: style.opacity,
        zIndex: style.zIndex,
        overflow: "hidden",
        pointerEvents: "none",
        transform: `perspective(1200px) rotateY(${style.rotateY % 360}deg)`,
      }}
    >
      <img
        src={imgSrc}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
};

export default ScrollImageMorph;
