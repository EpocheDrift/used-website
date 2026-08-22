'use client';

import { useState } from 'react';

const displayPhone = '+1 206 617 8809';
const phoneValue = '+12066178809';

export function ContactOptions({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(displayPhone);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`contact-menu ${compact ? 'contact-menu--compact' : ''}`}>
      <button
        className="contact-trigger"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>Contact Zayn</span>
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div className="contact-options" hidden={!open}>
        <a href={`sms:${phoneValue}`}>Send a text</a>
        <a href={`tel:${phoneValue}`}>Call Zayn</a>
        <button type="button" onClick={copyNumber} aria-live="polite">
          {copied ? 'Number copied ✓' : 'Copy phone number'}
        </button>
        <a
          href="https://instagram.com/zhuaizige3008"
          target="_blank"
          rel="noreferrer"
        >
          Instagram ↗
        </a>
      </div>
    </div>
  );
}

