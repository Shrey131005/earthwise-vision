
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
  const [sliderValue, setSliderValue] = useState(50);
  const [mapLayer, setMapLayer] = useState("satellite");
  const beforeImageRef = useRef<HTMLDivElement>(null);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

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
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="relative h-[460px] bg-slate-50 overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
              <p className="mt-3 text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Image comparison container */}
            <div className="relative w-full h-full">
              {/* After image (newer date) - Full width */}
              <div className="absolute inset-0 w-full h-full bg-cover bg-center"
                   style={{ 
                     backgroundImage: "url('/lovable-uploads/674dd430-2be7-4f5e-8498-d312c97a26c5.png')",
                     willChange: 'transform' // Hardware acceleration hint
                   }}>
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  After: Dec 2023
                </div>
              </div>
              
              {/* Before image (older date) - Width controlled by slider */}
              <div 
                ref={beforeImageRef}
                className="absolute inset-0 h-full bg-cover bg-center transition-transform"
                style={{ 
                  width: `${sliderValue}%`, 
                  backgroundImage: "url('/lovable-uploads/f8903f80-f69a-4aeb-9470-a52cfc5e6981.png')",
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
            
            {/* Map controls */}
            <div className="absolute right-4 top-4 flex flex-col space-y-2">
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
