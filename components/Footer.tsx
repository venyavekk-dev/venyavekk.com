import { ContactChips } from "@/components/ui/ContactChips";

export function Footer() {
  return (
    <footer className="grid gap-4 py-16 text-body sm:grid-cols-[1fr_auto]">
      <p>
        2016 → now
      </p>
      <ContactChips ariaLabel="Footer contacts" />
    </footer>
  );
}
