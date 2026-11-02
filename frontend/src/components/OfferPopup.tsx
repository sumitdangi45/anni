import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import singlePageImg   from "@/assets/cards_img/Single Page Website Pricing Card.png";
import multiRouteImg   from "@/assets/cards_img/Multiple Route Website Offer Card.png";

// Routes where popup should appear (not on contact/admin/legal)
const ALLOWED_PATHS = [
  "/", "/about", "/projects", "/pricing", "/blogs",
  "/work/custom", "/work/prebuilt",
  "/services/web-development", "/services/web-apps",
  "/services/saas", "/services/mobile",
  "/services/ai-ml", "/services/chatbot",
  "/ai-automation", "/digital-marketing",
  "/services/branding", "/services/seo",
  "/services/ecommerce", "/services/cloud-devops",
  "/services/cybersecurity", "/services/maintenance",
  "/services/design", "/services/ai-agents",
  "/internship",
];

const CARDS = [
  { img: singlePageImg,  alt: "Single Page Website Pricing Card" },
  { img: multiRouteImg,  alt: "Multiple Route Website Offer Card" },
];

const SESSION_KEY  = "anni_offer_dismissed";
const FIRST_DELAY  = 8_000;    // 8s after page load
const REPEAT_DELAY = 45_000;   // show again every 45s
const CLOSE_DELAY  = 60_000;   // after cross — reshow after 1 min

const OfferPopup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible,   setVisible]   = useState(false);
  const [animIn,    setAnimIn]    = useState(false);
  const [cardIdx,   setCardIdx]   = useState(0);
  const reshowTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isAllowedPath = ALLOWED_PATHS.some(
    p => location.pathname === p || location.pathname.startsWith(p + "/")
  );

  const show = useCallback(() => {
    if (!isAllowedPath) return;
    // alternate card each time
    setCardIdx(prev => (prev + 1) % CARDS.length);
    setVisible(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)));
  }, [isAllowedPath]);

  const hide = useCallback((byUser = false) => {
    setAnimIn(false);
    setTimeout(() => setVisible(false), 400);

    if (byUser) {
      // Cross clicked — reshow after 1 minute (not permanent)
      if (reshowTimer.current) clearTimeout(reshowTimer.current);
      reshowTimer.current = setTimeout(() => {
        show();
      }, CLOSE_DELAY);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // First show
  useEffect(() => {
    const t = setTimeout(() => show(), FIRST_DELAY);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Repeat show every 45s
  useEffect(() => {
    const t = setInterval(() => show(), REPEAT_DELAY);
    return () => clearInterval(t);
  }, [show]);

  // Re-trigger when route changes (after 5s on new page)
  useEffect(() => {
    const t = setTimeout(() => show(), 5_000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!visible) return null;

  const card = CARDS[cardIdx];

  return (
    <>
      <style>{`
        @keyframes offerSlideIn {
          from { opacity: 0; transform: translateY(40px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes offerSlideOut {
          from { opacity: 1; transform: translateY(0)    scale(1);    }
          to   { opacity: 0; transform: translateY(40px) scale(0.92); }
        }
        .offer-popup-wrap {
          position: fixed;
          bottom: 28px;
          right: 24px;
          z-index: 9999;
          width: 300px;
          animation: offerSlideIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .offer-popup-wrap.out {
          animation: offerSlideOut 0.35s ease-in forwards;
        }
        .offer-popup-img {
          width: 100%;
          border-radius: 18px;
          display: block;
          box-shadow: 0 16px 64px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.12);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .offer-popup-img:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 24px 80px rgba(0,0,0,0.32), 0 6px 20px rgba(0,0,0,0.15);
        }
        .offer-close-btn {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #111;
          border: 2.5px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          transition: background 0.2s, transform 0.2s;
          padding: 0;
        }
        .offer-close-btn:hover {
          background: #e11d48;
          transform: scale(1.12);
        }
        @media (max-width: 480px) {
          .offer-popup-wrap {
            width: 260px;
            bottom: 16px;
            right: 12px;
          }
        }
      `}</style>

      <div className={`offer-popup-wrap${animIn ? "" : " out"}`}>
        {/* Close button */}
        <button
          className="offer-close-btn"
          onClick={(e) => { e.stopPropagation(); hide(true); }}
          aria-label="Close offer"
        >
          <X size={14} color="#fff" strokeWidth={2.5} />
        </button>

        {/* Card image — click → /contact */}
        <img
          src={card.img}
          alt={card.alt}
          className="offer-popup-img"
          onClick={() => { hide(false); navigate("/contact"); }}
          draggable={false}
        />
      </div>
    </>
  );
};

export default OfferPopup;
