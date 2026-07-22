import { ContactChips } from "@/components/ui/ContactChips";

type ChipLink = { label: string; href: string };

type FooterProps = {
  links: readonly ChipLink[];
  showEmail?: boolean;
};

export function Footer({ links, showEmail = false }: FooterProps) {
  return (
    <footer className="grid gap-4 py-16 text-body sm:grid-cols-[1fr_auto]">
      <p>
        2016 → now
      </p>
      <ContactChips links={links} showEmail={showEmail} ariaLabel="Footer contacts" />
    </footer>
  );
}
