import { socialLinks } from "@/data/socialLinks";

const Hero = () => (
  <section className="flex min-h-[calc(70svh-11rem)] flex-col justify-center pb-24 sm:pb-32">
    <h1
      data-contour-peak
      className="fade-rise font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground"
    >
      Alex Frank
    </h1>
    <p
      className="fade-rise mt-5 max-w-md text-muted leading-relaxed"
      style={{ animationDelay: "0.15s" }}
    >
      Full-stack software engineer based in San Jose, CA.
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
          Resume ↓
        </a>
      </li>
    </ul>
  </section>
);

export default Hero;
