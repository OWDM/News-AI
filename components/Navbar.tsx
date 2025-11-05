'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  useEffect(() => {
    const nav = document.getElementById('main-nav');
    const maxScroll = 1000;
    const scrollThreshold = 50; // Only trigger after 50px scroll
    let rafId: number | null = null;

    const updateNav = () => {
      if (window.scrollY > scrollThreshold) {
        setIsScrolling(true);

        const scrollProgress = Math.min(window.scrollY / maxScroll, 1);
        const easeProgress = 1 - Math.pow(1 - scrollProgress, 4);

        const minWidth = 528;
        const maxWidth = window.innerWidth * 0.8;
        const currentWidth = maxWidth - (maxWidth - minWidth) * easeProgress;

        if (window.innerWidth >= 768 && nav) {
          nav.style.setProperty('width', `${currentWidth}px`);
        }
      } else {
        setIsScrolling(false);
        if (nav) {
          nav.style.setProperty('width', '80%');
        }
      }
      rafId = null;
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateNav);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Active section detection
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = { threshold: 0.6 };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="navbar-wrapper">
      <nav
        id="main-nav"
        className={`navbar ${isScrolling ? 'scrolling' : ''}`}
      >
        <div className="navbar-container">
          <ul className="navbar-list">
            {isScrolling && (
              <li className="navbar-item navbar-logo-item">
                <Link href="/" className="navbar-link flex items-center justify-center">
                  <img
                    src="/newsai-logo.png"
                    alt="News AI Logo"
                    className="w-12 h-12 object-contain"
                  />
                </Link>
              </li>
            )}
            <li className="navbar-item">
              {pathname === '/' ? (
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className={`navbar-link ${activeSection === 'home' ? 'active' : ''}`}
                >
                  <div className="nav-indicator hidden md:block"></div>
                  <span className="md:hidden navbar-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path>
                    </svg>
                  </span>
                  <span className="hidden md:inline-block">Home</span>
                  <span className="md:hidden navbar-label">Home</span>
                </a>
              ) : (
                <Link
                  href="/"
                  className={`navbar-link ${activeSection === 'home' ? 'active' : ''}`}
                >
                  <div className="nav-indicator hidden md:block"></div>
                  <span className="md:hidden navbar-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path>
                    </svg>
                  </span>
                  <span className="hidden md:inline-block">Home</span>
                  <span className="md:hidden navbar-label">Home</span>
                </Link>
              )}
            </li>
            <li className="navbar-item">
              {pathname === '/' ? (
                <a
                  href="#generator"
                  onClick={(e) => handleLinkClick(e, 'generator')}
                  className={`navbar-link ${activeSection === 'generator' ? 'active' : ''}`}
                >
                  <div className="nav-indicator hidden md:block"></div>
                  <span className="md:hidden navbar-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M13 10H18L12 16V12H7L13 6V10ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                    </svg>
                  </span>
                  <span className="hidden md:inline-block">Generator</span>
                  <span className="md:hidden navbar-label">Generator</span>
                </a>
              ) : (
                <Link
                  href="/#generator"
                  className={`navbar-link ${activeSection === 'generator' ? 'active' : ''}`}
                >
                  <div className="nav-indicator hidden md:block"></div>
                  <span className="md:hidden navbar-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                    >
                      <path d="M13 10H18L12 16V12H7L13 6V10ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                    </svg>
                  </span>
                  <span className="hidden md:inline-block">Generator</span>
                  <span className="md:hidden navbar-label">Generator</span>
                </Link>
              )}
            </li>
            <li className="navbar-item">
              <Link
                href="/contact"
                className={`navbar-link ${activeSection === 'contact' ? 'active' : ''}`}
              >
                <div className="nav-indicator hidden md:block"></div>
                <span className="md:hidden navbar-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path>
                  </svg>
                </span>
                <span className="hidden md:inline-block">Contact</span>
                <span className="md:hidden navbar-label">Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
