'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close −' : 'Menu +'}
      </button>
      <nav
        id="navigation"
        className={open ? 'navigation open' : 'navigation'}
        aria-label="Main navigation"
      >
        {[
          ['Work', '/work'],
          ['Services', '/services'],
          ['Studio', '/studio'],
          ['Journal', '/journal'],
          ['Enquire ↗', '/enquire'],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            aria-current={path.startsWith(href) ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>
    </>
  );
}
