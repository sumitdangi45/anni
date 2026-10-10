import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface FillButtonProps {
  children: React.ReactNode;
  href?: string;           // external link
  to?: string;             // internal route
  onClick?: () => void;
  variant?: "dark" | "light" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: boolean;          // show arrow icon circle
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}

const STYLE_TAG = `
  .fb-root {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    border: none;
    font-family: inherit;
    font-weight: 700;
    border-radius: 999px;
    transition: color 1.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .fb-root::before {
    content: '';
    position: absolute;
    inset: 0;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 2s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 0;
  }
  .fb-root:hover::before { transform: scaleX(1); }

  /* dark: black bg, white text → fill white, text black */
  .fb-dark { background: #111; color: #fff; }
  .fb-dark::before { background: #fff; }
  .fb-dark:hover { color: #111; }
  .fb-dark .fb-icon { background: #333; transition: background 1.8s cubic-bezier(0.22,1,0.36,1); }
  .fb-dark:hover .fb-icon { background: #111; }
  .fb-dark .fb-icon svg { color: #fff; transition: color 1.8s cubic-bezier(0.22,1,0.36,1); }
  .fb-dark:hover .fb-icon svg { color: #fff; }

  /* light: white bg, dark text → fill black, text white */
  .fb-light { background: #fff; color: #111; }
  .fb-light::before { background: #111; }
  .fb-light:hover { color: #fff; }
  .fb-light .fb-icon { background: #eee; transition: background 1.8s cubic-bezier(0.22,1,0.36,1); }
  .fb-light:hover .fb-icon { background: #fff; }
  .fb-light .fb-icon svg { color: #111; transition: color 1.8s cubic-bezier(0.22,1,0.36,1); }
  .fb-light:hover .fb-icon svg { color: #111; }

  /* outline: transparent bg, dark border → fill black, text white */
  .fb-outline { background: transparent; color: #111; border: 1.5px solid #ccc; }
  .fb-outline::before { background: #111; }
  .fb-outline:hover { color: #fff; }

  .fb-inner { position: relative; z-index: 1; display: flex; align-items: center; gap: 8px; }
  .fb-icon {
    position: relative; z-index: 1;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  /* sizes */
  .fb-sm  { padding: 8px 18px 8px 8px;   font-size: 13px; }
  .fb-sm  .fb-icon { width: 24px; height: 24px; }
  .fb-md  { padding: 11px 22px 11px 11px; font-size: 14px; }
  .fb-md  .fb-icon { width: 28px; height: 28px; }
  .fb-lg  { padding: 13px 26px 13px 13px; font-size: 15px; }
  .fb-lg  .fb-icon { width: 32px; height: 32px; }

  /* no-icon variant */
  .fb-sm-plain  { padding: 8px 18px;   font-size: 13px; }
  .fb-md-plain  { padding: 11px 22px;  font-size: 14px; }
  .fb-lg-plain  { padding: 13px 26px;  font-size: 15px; }
`;

let styleInjected = false;

const FillButton = ({
  children, href, to, onClick,
  variant = "dark", size = "md", icon = true,
  className = "", style, target, rel,
}: FillButtonProps) => {
  // inject styles once
  if (typeof document !== "undefined" && !styleInjected) {
    const el = document.createElement("style");
    el.textContent = STYLE_TAG;
    document.head.appendChild(el);
    styleInjected = true;
  }

  const variantClass = `fb-${variant}`;
  const sizeClass = icon ? `fb-${size}` : `fb-${size}-plain`;
  const classes = `fb-root ${variantClass} ${sizeClass} ${className}`.trim();

  const iconSize = size === "sm" ? 11 : size === "lg" ? 15 : 13;

  const inner = (
    <span className="fb-inner">
      {icon && (
        <span className="fb-icon">
          <ArrowRight size={iconSize} />
        </span>
      )}
      {children}
    </span>
  );

  if (to) {
    return <Link to={to} className={classes} style={style}>{inner}</Link>;
  }
  if (href) {
    return <a href={href} className={classes} style={style} target={target} rel={rel}>{inner}</a>;
  }
  return (
    <button onClick={onClick} className={classes} style={style} type="button">
      {inner}
    </button>
  );
};

export default FillButton;
