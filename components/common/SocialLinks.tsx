import Link from "next/link";
import { socialLinks } from "@/data/socialLinks";
import { SocialLink } from "@/lib/types";

interface SocialLinkItemProps extends SocialLink {
  size: number;
}

const SocialLinkItem = ({ href, icon: Icon, label, size }: SocialLinkItemProps) => (
  <Link
    href={href}
    className="group relative text-muted-foreground hover:text-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-2"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
  >
    <span className="block transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
      <Icon size={size} />
    </span>
    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-px bg-accent transition-all duration-300 group-hover:w-4" />
  </Link>
);

interface SocialLinksProps {
  size: number;
  links?: SocialLink[];
}

const SocialLinks = ({ size, links = socialLinks }: SocialLinksProps) => {
  return (
    <div className="flex justify-center items-center gap-4">
      {links.map((link) => (
        <SocialLinkItem key={link.id} {...link} size={size} />
      ))}
    </div>
  );
};

export default SocialLinks;
