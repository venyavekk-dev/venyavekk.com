import Link from "next/link";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  const isInternal = href.startsWith("/") || href.startsWith("./") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href.replace("./", "/")} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
