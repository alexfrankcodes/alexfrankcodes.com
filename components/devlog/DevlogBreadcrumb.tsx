import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export function DevlogBreadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-2">
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground">{crumb.label}</span>
            )}
            {i < crumbs.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
