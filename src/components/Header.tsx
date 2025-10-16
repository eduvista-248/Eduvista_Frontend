import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
// import { ThemeToggle } from "./ThemeToggle";
import logo from "../assets/withoutBackground.png";
import "../styles/header.css";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "features"]; //"contact" removed
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-background backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-6 px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="h-12 bg-[rgba(f,f,f,1)] rounded-lg flex items-center justify-center" id="logoContainer">
              {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> */}
              <img src={logo} className="w-full h-auto" alt="AEVAM" />
            </div>
            {/* <span className="font-bold text-2xl">Aevam</span> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 " id="navBar">
            <button 
              onClick={() => scrollToSection('home')}
              className={`relative pb-2 transition-colors ${
                activeSection === 'home' 
                  ? 'text-blue font-medium' 
                  : 'text-foreground hover:text-blue'
              }`}
            >
              Home
              {activeSection === 'home' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`relative pb-2 transition-colors ${
                activeSection === 'about' 
                  ? 'text-blue font-medium' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              About
              {activeSection === 'about' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className={`relative pb-2 transition-colors ${
                activeSection === 'services' 
                  ? 'text-primary font-medium' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Services
              {activeSection === 'services' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className={`relative pb-2 transition-colors ${
                activeSection === 'features' 
                  ? 'text-primary font-medium' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Features
              {activeSection === 'features' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue rounded-full"></div>
              )}
            </button>
          </nav>


          {/* Mobile Menu Button */}
          <button
            className="p-2"
            id="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-white">
            <nav className="flex flex-col space-y-4 px-4">
              <button 
                onClick={() => scrollToSection('home')}
                className={`text-left transition-colors ${
                  activeSection === 'home' 
                    ? 'text-primary font-medium' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`text-left transition-colors ${
                  activeSection === 'about' 
                    ? 'text-primary font-medium' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className={`text-left transition-colors ${
                  activeSection === 'services' 
                    ? 'text-primary font-medium' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className={`text-left transition-colors ${
                  activeSection === 'features' 
                    ? 'text-primary font-medium' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                Features
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}