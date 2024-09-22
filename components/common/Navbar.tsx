"use client";

import { motion } from "framer-motion";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [clickedItem, setClickedItem] = useState("");

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Mentorship", href: "#mentorship" },
    { label: "Contact", href: "#contact" },
  ];

  // Memoize the debouncedHandleScroll function
  const debouncedHandleScroll = useCallback(
    debounce(() => {
      setIsScrolled(window.scrollY > 20);
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector("nav");
      if (isMenuOpen && nav && !nav.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => clickedItem === href;

  const smoothScroll = (targetId: string) => {
    const target = document.querySelector(targetId);
    if (target) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (href: string) => {
    setClickedItem(href);
    setIsMenuOpen(false);
    smoothScroll(href);

    // Reset clickedItem after a brief delay
    setTimeout(() => {
      setClickedItem("");
    }, 300);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-100 dark:bg-gray-900 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-foreground dark:text-foreground-dark"
        >
          Alex Frank
        </Link>

        {/* Desktop menu with ThemeToggle */}
        <div className="hidden md:flex items-center space-x-6">
          <ThemeToggle />
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      isActive(item.href)
                        ? "text-accent dark:text-accent-dark"
                        : "text-black dark:text-white hover:text-accent-secondary dark:hover:text-accent-secondary-dark"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.href);
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile menu button and ThemeToggle */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button
            className="text-foreground dark:text-foreground-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <motion.div
          className="md:hidden absolute top-full left-0 right-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen && (
            <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark bg-opacity-90">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-accent dark:text-accent-dark"
                        : "text-foreground dark:text-foreground-dark hover:text-accent-secondary dark:hover:text-accent-secondary-dark"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.href);
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
