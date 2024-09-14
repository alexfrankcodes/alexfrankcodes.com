const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-white mb-8">
      <p>© Alexander Frank {currentYear}</p>
    </footer>
  );
};

export default Footer;
