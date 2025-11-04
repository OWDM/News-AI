'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const nav = document.getElementById('main-nav');
    const maxScroll = 1000;
    let rafId: number | null = null;

    const updateNav = () => {
      if (window.scrollY > 0) {
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
            <li className="navbar-item">
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
            </li>
            <li className="navbar-item">
              <a
                href="#projects"
                onClick={(e) => handleLinkClick(e, 'projects')}
                className={`navbar-link ${activeSection === 'projects' ? 'active' : ''}`}
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
                    <path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z"></path>
                  </svg>
                </span>
                <span className="hidden md:inline-block">Projects</span>
                <span className="md:hidden navbar-label">Projects</span>
              </a>
            </li>
            <li className="navbar-item">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
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
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
