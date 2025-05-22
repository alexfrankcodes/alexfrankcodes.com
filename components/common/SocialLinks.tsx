import { motion } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface SocialLinkProps {
  href: string;
  icon: IconType;
  label: string;
  size: number;
}

const SocialLink = ({ href, icon: Icon, label, size }: SocialLinkProps) => (
  <motion.div whileHover={{ scale: 1.1, y: -5 }}>
    <Link
      href={href}
      className="text-muted-foreground dark:text-muted-foreground-dark hover:text-accent-secondary dark:hover:text-accent-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark rounded"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <Icon size={size} />
    </Link>
  </motion.div>
);

interface SocialLinksProps {
  size: number;
  links?: SocialLinkProps[];
}

const defaultLinks: SocialLinkProps[] = [
  {
    href: "https://github.com/alexfrankcodes",
    icon: FaGithub,
    label: "Go to Alex's GitHub",
    size: 0, // This will be overwritten by the size prop
  },
  {
    href: "https://www.linkedin.com/in/alexfrankcodes/",
    icon: FaLinkedin,
    label: "Go to Alex's LinkedIn",
    size: 0,
  },
  {
    href: "mailto:alexfrankcodes@gmail.com",
    icon: MdEmail,
    label: "Send Alex an email",
    size: 0,
  },
];

const SocialLinks = ({ size, links = defaultLinks }: SocialLinksProps) => {
  return (
    <div className="flex justify-center space-x-8">
      {links.map((link, index) => (
        <SocialLink key={index} {...link} size={size} />
      ))}
    </div>
  );
};

export default SocialLinks;
