"use client";

import { useState } from "react";

type EmailCopyButtonProps = {
  className?: string;
  email?: string;
  label?: string;
};

export function EmailCopyButton({ className = "", email = "venyavekk@gmail.com", label = email }: EmailCopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1400);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className={`${className} email-copy-chip ${isCopied ? "is-copied" : ""}`.trim()} onClick={copyEmail}>
      {isCopied ? "Copied" : label}
    </button>
  );
}
