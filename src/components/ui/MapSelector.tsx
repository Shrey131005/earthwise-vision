
import { useEffect, useRef, useState } from 'react';
import { Globe } from 'lucide-react';

// This is a placeholder component - in a real implementation,
// you would integrate with a mapping library like Leaflet or Google Maps
const MapSelector = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapError, setIsMapError] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // In a real implementation, you would initialize the map here
      // and handle any potential errors
      
      // Example of error handling:
      // setIsMapError(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="h-[400px] relative bg-stone-100">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-3">
              <Globe className="h-10 w-10 animate-pulse text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        ) : isMapError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-3 text-destructive">
              <p className="text-sm">Failed to load map</p>
              <button 
                className="text-xs underline"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <>
            <div 
              ref={mapContainerRef} 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1569974498991-d3c12a504f95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')",
                opacity: 0.8
              }}
            ></div>
            <div className="absolute top-3 left-3 z-10">
              <div className="bg-background/90 backdrop-blur-sm p-3 rounded-md shadow-sm border text-xs">
                <p className="font-medium">Draw Area of Interest</p>
                <p className="text-muted-foreground mt-1">Use the tools below to select an area</p>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 z-10">
              <div className="flex space-x-2">
                <button className="p-2 bg-background rounded-md shadow-sm border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3h18v18H3z"/>
                  </svg>
                </button>
                <button className="p-2 bg-background rounded-md shadow-sm border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                    <line x1="8" y1="2" x2="8" y2="18"/>
                    <line x1="16" y1="6" x2="16" y2="22"/>
                  </svg>
                </button>
                <button className="p-2 bg-background rounded-md shadow-sm border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="p-4 border-t">
        <p className="text-sm font-medium mb-1">Selected Area</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Latitude</label>
            <input 
              type="text" 
              placeholder="37.7749"
              className="w-full p-2 text-sm border rounded-md"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Longitude</label>
            <input 
              type="text" 
              placeholder="-122.4194"
              className="w-full p-2 text-sm border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSelector;
