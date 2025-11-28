'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Set active section based on pathname and hash
  useEffect(() => {
    if (pathname === '/contact') {
      setActiveSection('contact');
    } else if (pathname === '/') {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['home', 'generator', 'contact'].includes(hash)) {
        setActiveSection(hash);
      } else {
        setActiveSection('home');
      }
    }
  }, [pathname]);

  // Active section detection (only on home page)
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      threshold: [0, 0.1, 0.2, 0.3],
      rootMargin: '-20% 0px -60% 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length === 0) return;

      const topEntry = visibleEntries.reduce((max, entry) =>
        entry.intersectionRatio > max.intersectionRatio ? entry : max
      );

      const id = (topEntry.target as Element).getAttribute('id');
      if (id) {
        setActiveSection(id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId);
    setMobileMenuOpen(false); // Close mobile menu on navigation

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar-floating">
        <div className="navbar-logo">
          <Link href="/">
            <img
              src="/newsai-logo.png"
              alt="News AI"
              className="w-10 h-10 object-contain"
            />
          </Link>
        </div>

        <ul className="navbar-menu">
          <li>
            {pathname === '/' ? (
              <a
                href="#home"
                onClick={(e) => handleLinkClick(e, 'home')}
                className={`navbar-menu-link ${activeSection === 'home' ? 'active' : ''}`}
                data-section="home"
              >
                <svg className="navbar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>
              </a>
            ) : (
              <Link
                href="/"
                className={`navbar-menu-link ${activeSection === 'home' ? 'active' : ''}`}
                data-section="home"
              >
                <svg className="navbar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>
              </Link>
            )}
          </li>

          <li>
            {pathname === '/' ? (
              <a
                href="#generator"
                onClick={(e) => handleLinkClick(e, 'generator')}
                className={`navbar-menu-link ${activeSection === 'generator' ? 'active' : ''}`}
                data-section="generator"
              >
                <svg className="navbar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
                <span>Summarizer</span>
              </a>
            ) : (
              <Link
                href="/#generator"
                className={`navbar-menu-link ${activeSection === 'generator' ? 'active' : ''}`}
                data-section="generator"
              >
                <svg className="navbar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
                <span>Summarizer</span>
              </Link>
            )}
          </li>

          <li>
            <Link
              href="/contact"
              className={`navbar-menu-link ${activeSection === 'contact' ? 'active' : ''}`}
              data-section="contact"
            >
              <svg className="navbar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className="navbar-hamburger"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></div>
        <div className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></div>
        <div className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></div>
      </button>

      {/* Mobile Slide-in Menu */}
      <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Overlay */}
        <div
          className={`navbar-mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <nav className={`navbar-mobile-panel ${mobileMenuOpen ? 'open' : ''}`}>
          {/* Close Button */}
          <button
            className="navbar-mobile-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <div className="navbar-mobile-logo">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <img
                src="/newsai-logo.png"
                alt="News AI"
                className="w-12 h-12 object-contain"
              />
            </Link>
          </div>

          {/* Menu Items */}
          <ul className="navbar-mobile-items">
            <li>
              {pathname === '/' ? (
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className={`navbar-mobile-link ${activeSection === 'home' ? 'active' : ''}`}
                >
                  <svg className="navbar-mobile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Home</span>
                </a>
              ) : (
                <Link
                  href="/"
                  className={`navbar-mobile-link ${activeSection === 'home' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="navbar-mobile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Home</span>
                </Link>
              )}
            </li>

            <li>
              {pathname === '/' ? (
                <a
                  href="#generator"
                  onClick={(e) => handleLinkClick(e, 'generator')}
                  className={`navbar-mobile-link ${activeSection === 'generator' ? 'active' : ''}`}
                >
                  <svg className="navbar-mobile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg>
                  <span>Summarizer</span>
                </a>
              ) : (
                <Link
                  href="/#generator"
                  className={`navbar-mobile-link ${activeSection === 'generator' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="navbar-mobile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg>
                  <span>Summarizer</span>
                </Link>
              )}
            </li>

            <li>
              <Link
                href="/contact"
                className={`navbar-mobile-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="navbar-mobile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
