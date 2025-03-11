
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-12 mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                <span className="font-bold text-lg">LC</span>
              </div>
              <span className="font-semibold text-xl tracking-tight">EarthVision</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              AI-powered land cover classification for environmental monitoring, urban planning, and research.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="col-span-1">
            <h3 className="text-base font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/upload" className="text-sm text-muted-foreground hover:text-primary transition-colors">Upload</Link></li>
              <li><Link to="/results" className="text-sm text-muted-foreground hover:text-primary transition-colors">Results</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/api" className="text-sm text-muted-foreground hover:text-primary transition-colors">API Access</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-base font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-base font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">support@earthvision.ai</li>
              <li>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} EarthVision. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
