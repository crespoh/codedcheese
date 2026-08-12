const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-8">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-soft">
        <span>&copy; {currentYear} Coded Cheese</span>
        <nav className="flex gap-4">
          <a href="mailto:info@codedcheese.com" className="hover:text-ink transition-colors">Email</a>
          <a href="/apps" className="hover:text-ink transition-colors">Apps</a>
          <a href="/privacy-policy" className="hover:text-ink transition-colors">Privacy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
