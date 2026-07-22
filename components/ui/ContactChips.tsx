import { ExternalLink } from "@/components/ui/ExternalLink";
import { EmailCopyButton } from "@/components/ui/EmailCopyButton";
import { links } from "@/lib/data";

type ContactChipsProps = {
  className?: string;
  ariaLabel?: string;
};

export function ContactChips({ className = "", ariaLabel = "Contacts" }: ContactChipsProps) {
  return (
    <nav aria-label={ariaLabel} className={`contact-chip-row flex flex-wrap gap-2 ${className}`.trim()}>
      {links.map((link) => (
        <ExternalLink href={link.href} className="soft-chip" key={link.label}>
          {link.label}
        </ExternalLink>
      ))}
      <EmailCopyButton className="soft-chip" label="Email" />
    </nav>
  );
}
