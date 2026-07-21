import { socialLinks } from "@/data/socialLinks";
import { SECTION_IDS } from "@/data/navigation";
import Section from "@/components/Section";

const Contact = () => (
  <Section id={SECTION_IDS.contact} title="Contact">
    <p className="text-muted leading-relaxed max-w-lg">
      I{"'"}m always open to new opportunities, collaborations, and mentorship
      requests. Feel free to reach out!
    </p>
    <p className="mt-8">
      <a
        href="mailto:alexfrankcodes@gmail.com"
        className="link-draw font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
      >
        alexfrankcodes@gmail.com
      </a>
    </p>
    <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
      {socialLinks
        .filter((link) => !link.href.startsWith("mailto:"))
        .map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {link.label} ↗
            </a>
          </li>
        ))}
    </ul>
  </Section>
);

export default Contact;
