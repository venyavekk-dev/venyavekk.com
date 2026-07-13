import { ExternalLink } from "@/components/ui/ExternalLink";
import { EmailCopyButton } from "@/components/ui/EmailCopyButton";
import { links } from "@/lib/data";

export function Footer() {
  return (
    <footer className="grid gap-4 py-16 text-body sm:grid-cols-[1fr_auto]">
      <p>
        2016 → now
      </p>
      <nav aria-label="Footer contacts" className="flex flex-wrap gap-x-6 gap-y-1">
        {links.map((link) => (
          <ExternalLink key={link.label} href={link.href}>
            {link.label}
          </ExternalLink>
        ))}
        <EmailCopyButton />
      </nav>
    </footer>
  );
}
