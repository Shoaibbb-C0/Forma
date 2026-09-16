import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";

export default function TransitionLink({ to, children, onClick, ...props }) {
  const navigate = useNavigate();
  const [cover, setCover] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  function transition(event) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    event.preventDefault();
    if (timer.current) return;
    setCover(true);
    timer.current = setTimeout(() => navigate(to), 420);
  }

  return (
    <>
      <Link to={to} onClick={transition} {...props}>
        {children}
      </Link>
      {cover &&
        createPortal(
          <div className="route-curtain" aria-hidden="true">
            <span>FORMA / PROJECT</span>
          </div>,
          document.body,
        )}
    </>
  );
}
