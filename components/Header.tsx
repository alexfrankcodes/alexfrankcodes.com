import Link from "next/link";
import { NAV_ITEMS } from "@/data/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => (
  <header className="flex items-center justify-between py-8">
    <Link
      href="/"
      className="font-display font-semibold tracking-tight text-foreground hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
    >
      Alex Frank
    </Link>
    <div className="flex items-center gap-1 sm:gap-5">
      <nav aria-label="Sections" className="hidden sm:block">
        <ul className="flex gap-5 font-mono text-xs text-muted">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                {item.label.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <ThemeToggle />
    </div>
  </header>
);

export default Header;
