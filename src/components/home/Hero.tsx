
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"></div>
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1569974498991-d3c12a504f95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="inline-block text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full mb-3">
              AI-Powered Land Classification
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-balance">
              Earth Monitoring with Precision
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
              Upload satellite imagery or select an area on the map to get detailed land cover classification with advanced AI processing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/upload" 
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium bg-primary text-primary-foreground shadow transition-all hover:bg-primary/90"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/about" 
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative rounded-xl overflow-hidden shadow-elevated">
              <img 
                src="https://images.unsplash.com/photo-1529148482759-b35b25c5f217?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                alt="Satellite view of land classification" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="w-full p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-earth-500 text-white rounded-full mb-2">Classification Demo</span>
                  <p className="text-white text-sm">
                    AI-generated land cover classification showing urban development, water bodies, and vegetation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
