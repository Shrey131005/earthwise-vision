
import { useState, useEffect, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { debounce } from 'lodash';

const DetectionMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [mapLayer, setMapLayer] = useState("satellite");
  const beforeImageRef = useRef<HTMLDivElement>(null);
  
  // Image paths - ensure these are correct
  const beforeImagePath = '/lovable-uploads/f8903f80-f69a-4aeb-9470-a52cfc5e6981.png';
  const afterImagePath = '/lovable-uploads/674dd430-2be7-4f5e-8498-d312c97a26c5.png';
  
  // Load images
  useEffect(() => {
    console.log("Loading images:", beforeImagePath, afterImagePath);
    
    // Preload images to ensure they're in the browser cache
    const preloadImages = () => {
      const beforeImg = new Image();
      const afterImg = new Image();
      
      // Track loading status
      let beforeLoaded = false;
      let afterLoaded = false;
      
      const checkAllLoaded = () => {
        if (beforeLoaded && afterLoaded) {
          console.log("Both images loaded successfully");
          setImagesLoaded(true);
          setIsLoading(false);
        }
      };
      
      beforeImg.onload = () => {
        console.log("Before image loaded");
        beforeLoaded = true;
        checkAllLoaded();
      };
      
      beforeImg.onerror = (e) => {
        console.error("Error loading before image:", e);
        setIsLoading(false);  // Stop loading even if image fails
      };
      
      afterImg.onload = () => {
        console.log("After image loaded");
        afterLoaded = true;
        checkAllLoaded();
      };
      
      afterImg.onerror = (e) => {
        console.error("Error loading after image:", e);
        setIsLoading(false);  // Stop loading even if image fails
      };
      
      // Start loading images
      beforeImg.src = beforeImagePath;
      afterImg.src = afterImagePath;
      
      // If images are already cached, the onload event might not fire
      // So we check if they're complete already
      if (beforeImg.complete) beforeImg.onload?.(new Event('load') as any);
      if (afterImg.complete) afterImg.onload?.(new Event('load') as any);
    };
    
    preloadImages();
  }, [beforeImagePath, afterImagePath]);

  // Optimized slider update with debounce to prevent laggy UI
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSlider = useCallback(
    debounce((value: number) => {
      if (beforeImageRef.current) {
        beforeImageRef.current.style.width = `${value}%`;
      }
    }, 5), // 5ms debounce time - just enough to batch updates without noticeable delay
    [beforeImageRef]
  );

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setSliderValue(newValue);
    updateSlider(newValue);
  };

  // Apply initial width
  useEffect(() => {
    if (beforeImageRef.current && !isLoading) {
      beforeImageRef.current.style.width = `${sliderValue}%`;
    }
  }, [isLoading, sliderValue]);

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-sm border animate-fade-in-up">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Change Detection Maps</h2>
          <Select defaultValue={mapLayer} onValueChange={setMapLayer}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Map Layers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="satellite">Satellite</SelectItem>
              <SelectItem value="topographic">Topographic</SelectItem>
              <SelectItem value="street">Street</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="relative h-[460px] bg-slate-50 overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
              <p className="mt-3 text-sm text-muted-foreground">Loading maps...</p>
            </div>
          </div>
        ) : (
          <>
            {imagesLoaded ? (
              <div className="relative w-full h-full">
                {/* After image (newer date) - Full width */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backgroundImage: `url(${afterImagePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    willChange: 'transform' // Hardware acceleration hint
                  }}
                >
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    After: Dec 2023
                  </div>
                </div>
                
                {/* Before image (older date) - Width controlled by slider */}
                <div 
                  ref={beforeImageRef}
                  className="absolute inset-0 h-full transition-transform"
                  style={{ 
                    width: `${sliderValue}%`, 
                    backgroundImage: `url(${beforeImagePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRight: '2px solid white',
                    willChange: 'width', // Hardware acceleration hint
                    transform: 'translateZ(0)' // Force GPU acceleration
                  }}
                >
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Before: Jan 2023
                  </div>
                </div>
                
                {/* Slider handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                  style={{ 
                    left: `${sliderValue}%`, 
                    transform: 'translateX(-50%) translateZ(0)', // Force GPU acceleration
                    willChange: 'left', // Hardware acceleration hint
                    zIndex: 10
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                    <div className="w-1 h-4 bg-slate-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-md shadow-md">
                  <p className="text-red-500 font-medium">Failed to load images.</p>
                  <div className="mt-2 text-sm text-slate-500">
                    Attempted to load:<br />
                    Before: {beforeImagePath}<br />
                    After: {afterImagePath}
                  </div>
                  <Button 
                    className="mt-3 w-full" 
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                </div>
              </div>
            )}
            
            {/* Debug view - only show when debug layer is selected */}
            {mapLayer === "debug" && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                <div className="bg-white p-4 rounded-md shadow-md max-w-md">
                  <h3 className="font-medium mb-2">Image Debug Info</h3>
                  <div className="text-xs space-y-1">
                    <p><strong>Before Image:</strong> {beforeImagePath}</p>
                    <p><strong>After Image:</strong> {afterImagePath}</p>
                    <p><strong>Images Loaded:</strong> {imagesLoaded ? 'Yes' : 'No'}</p>
                    <p><strong>Loading State:</strong> {isLoading ? 'Loading' : 'Completed'}</p>
                    <p><strong>Slider Position:</strong> {sliderValue}%</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3 w-full" 
                    onClick={() => window.location.reload()}
                  >
                    Reload Page
                  </Button>
                </div>
              </div>
            )}
            
            {/* Map controls */}
            <div className="absolute right-4 top-4 flex flex-col space-y-2 z-30">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur-sm">
                      <ZoomIn size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zoom In</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur-sm">
                      <ZoomOut size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zoom Out</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur-sm">
                      <Maximize size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Full Screen</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </>
        )}
      </div>

      {/* Slider control */}
      <div className="p-4 border-t">
        <div className="flex items-center px-2">
          <Slider
            value={[sliderValue]}
            onValueChange={handleSliderChange}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <div>Jan 2023</div>
          <div>Dec 2023</div>
        </div>
      </div>
    </div>
  );
};

export default DetectionMap;
