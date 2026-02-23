const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center pb-10 pt-6 text-muted-foreground">
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto mb-6" />
      <p className="text-sm tracking-wide">
        &copy; {currentYear}{" "}
        <span className="font-display italic text-foreground">Alexander Frank</span>
      </p>
    </footer>
  );
};

export default Footer;
