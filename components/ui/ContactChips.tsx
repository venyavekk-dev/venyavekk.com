import { ExternalLink } from "@/components/ui/ExternalLink";
import { EmailCopyButton } from "@/components/ui/EmailCopyButton";

type ChipLink = { label: string; href: string };

type ContactChipsProps = {
  links: readonly ChipLink[];
  showEmail?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function ContactChips({ links, showEmail = false, className = "", ariaLabel = "Contacts" }: ContactChipsProps) {
  return (
    <nav aria-label={ariaLabel} className={`contact-chip-row flex flex-wrap gap-2 ${className}`.trim()}>
      {links.map((link) => (
        <ExternalLink href={link.href} className="soft-chip" key={link.label}>
          {link.label}
        </ExternalLink>
      ))}
      {showEmail ? <EmailCopyButton className="soft-chip" label="Email" /> : null}
    </nav>
  );
}
