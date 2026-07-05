import { socialLinks } from "@/data/socialLinks";
import WindField from "@/components/WindField";

const Hero = () => (
  <section className="pt-10 pb-24 sm:pt-16 sm:pb-32">
    <div className="relative">
      <div
        className="absolute inset-x-0 -top-6 sm:-top-10 h-72 sm:h-80 pointer-events-none select-none"
        aria-hidden="true"
      >
        <WindField />
      </div>
      <div className="relative pt-44 sm:pt-52">
        <h1 className="fade-rise font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground">
          Alex Frank
        </h1>
        <p
          className="fade-rise mt-5 max-w-md text-muted leading-relaxed"
          style={{ animationDelay: "0.15s" }}
        >
          Full-stack software engineer at Southwest Airlines, working remotely
          from San Jose, CA.
        </p>
        <ul
          className="fade-rise mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm"
          style={{ animationDelay: "0.3s" }}
        >
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-foreground hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                {link.label} ↗
              </a>
            </li>
          ))}
          <li>
            <a
              href="./AlexanderFrank_Resume.pdf"
              download
              className="text-foreground hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Résumé ↓
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default Hero;
