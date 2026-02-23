import { SocialLink } from "@/lib/types";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    href: "https://github.com/alexfrankcodes",
    icon: FaGithub,
    label: "Go to Alex's GitHub",
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/alexfrankcodes/",
    icon: FaLinkedin,
    label: "Go to Alex's LinkedIn",
  },
  {
    id: "email",
    href: "mailto:alexfrankcodes@gmail.com",
    icon: MdEmail,
    label: "Send Alex an email",
  },
];
