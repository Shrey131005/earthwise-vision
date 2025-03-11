
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'Upload', path: '/upload' },
    { text: 'Results', path: '/results' },
    { text: 'API', path: '/api' },
    { text: 'About', path: '/about' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMenuOpen 
          ? 'glassmorphism py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
              <span className="font-bold text-lg">LC</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">EarthVision</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'transition-all duration-200 hover:text-primary text-sm font-medium',
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-foreground/80'
                )}
              >
                {link.text}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 animate-fade-in-up">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'block transition-all duration-200 hover:text-primary py-2',
                  location.pathname === link.path 
                    ? 'text-primary font-medium' 
                    : 'text-foreground/80'
                )}
              >
                {link.text}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
