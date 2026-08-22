import { ExternalLink } from "@/components/ui/ExternalLink";
import { EmailCopyButton } from "@/components/ui/EmailCopyButton";
import Image from "next/image";

type ChipLink = { label: string; href: string; icon?: string };

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
          {link.icon ? (
            <Image
              src={link.icon}
              alt=""
              width={16}
              height={16}
              className="soft-chip-icon"
              aria-hidden="true"
            />
          ) : null}
          {link.label}
        </ExternalLink>
      ))}
      {showEmail ? <EmailCopyButton className="soft-chip" label="Email" /> : null}
    </nav>
  );
}
