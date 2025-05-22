const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center mb-8 text-foreground dark:text-foreground-dark">
      <p>© Alexander Frank {currentYear}</p>
    </footer>
  );
};

export default Footer;
