import { ExternalLink } from "@/components/ui/ExternalLink";
import { EmailCopyButton } from "@/components/ui/EmailCopyButton";
import { links } from "@/lib/data";

export function Header() {
  return (
    <header className="grid grid-cols-[1fr_auto] gap-6 text-body sm:grid-cols-[minmax(260px,1fr)_auto]">
      <div className="flex items-start gap-3">
        <img
          src="/assets/zhoGyz3txRaZFjgEq7BreUwhbQ.jpeg"
          width={54}
          height={54}
          alt="Veniamin Vekk portrait"
          className="h-10 w-10 rounded-full object-cover transition duration-200 hover:scale-95 active:scale-[0.93] sm:h-[54px] sm:w-[54px]"
        />
        <h1 className="font-normal">
          <strong className="font-semibold">Veniamin Vekk,</strong>
          <br />
          Designer, musician, and <ExternalLink href="/films">filmmaker</ExternalLink>
        </h1>
      </div>
      <nav aria-label="Contacts" className="flex flex-col items-start gap-0 sm:flex-row sm:gap-6">
        {links.map((link) => (
          <ExternalLink key={link.label} href={link.href}>
            {link.label}
          </ExternalLink>
        ))}
        <EmailCopyButton />
      </nav>
    </header>
  );
}
