import { useState } from 'react';
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/auth/AuthProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { session } = useAuth();

  // The header now renders on the signed-in pages too, so this link has to
  // follow the session rather than always inviting the user to sign in.
  const accountLink = session
    ? { to: "/app", label: "your app →" }
    : { to: "/login", label: "sign in →" };

  const navLinks = (
    <>
      <a href="/#apps" className="text-ink-soft hover:text-ink transition-colors" onClick={() => setIsMenuOpen(false)}>Apps</a>
      <a href="/#about" className="text-ink-soft hover:text-ink transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
      <a href="/#contact" className="text-ink-soft hover:text-ink transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
      <Link to={accountLink.to} className="font-mono text-sm text-ink-soft hover:text-ink transition-colors" onClick={() => setIsMenuOpen(false)}>{accountLink.label}</Link>
    </>
  );

  return (
    <header className="border-b border-line">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <Link to="/" className="text-logo hover:opacity-80 transition-opacity">
          <Logo className="h-7 w-auto md:h-8" />
        </Link>

        {/* The toggle sits outside the collapsible nav so it stays reachable on
            mobile without opening the menu. */}
        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks}
          </nav>

          <ThemeToggle />

          <button
            className="md:hidden h-9 w-9 flex items-center justify-center text-ink"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <span className="text-xl leading-none">&times;</span>
            ) : (
              <span className="text-xl leading-none">&#9776;</span>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-line">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4 text-sm">
            {navLinks}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
