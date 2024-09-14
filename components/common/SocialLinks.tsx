import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SocialLinks = ({ size }: { size: number }) => {
  return (
    <div className="flex justify-center space-x-8">
      <motion.div whileHover={{ scale: 1.1, y: -5 }}>
        <Link
          href="https://github.com/alexfrankcodes"
          className="text-gray-400 hover:text-white"
          target="_blank"
          aria-label="Go to Alex's GitHub"
        >
          <FaGithub size={size} />
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1, y: -5 }}>
        <Link
          href="https://www.linkedin.com/in/alexfrankcodes/"
          className="text-gray-400 hover:text-white"
          target="_blank"
          aria-label="Go to Alex's LinkedIn"
        >
          <FaLinkedin size={size} />
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1, y: -5 }}>
        <Link
          href="mailto:alexfrankcodes@gmail.com"
          className="text-gray-400 hover:text-white"
          aria-label="Send Alex an email"
        >
          <MdEmail size={size} />
        </Link>
      </motion.div>
    </div>
  )
}

export default SocialLinks;