
import { useState, useEffect, useRef } from 'react';
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

const DetectionMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState("Dec 2023");
  const sliderRef = useRef<HTMLInputElement>(null);
  
  // Simulate data points for the map
  const dataPoints = [
    { id: 1, color: 'bg-green-200', position: { top: '60%', left: '35%' }, size: 60 },
    { id: 2, color: 'bg-red-200', position: { top: '30%', left: '20%' }, size: 50 },
  ];

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const months = ["Jan 2023", "Feb 2023", "Mar 2023", "Apr 2023", "May 2023", "Jun 2023", 
                    "Jul 2023", "Aug 2023", "Sep 2023", "Oct 2023", "Nov 2023", "Dec 2023"];
    setCurrentMonth(months[value]);
  };

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-sm border animate-fade-in-up">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Change Detection Maps</h2>
          <Select defaultValue="satellite">
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
      
      <div className="relative h-[460px] bg-slate-50">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
              <p className="mt-3 text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Map background with radial grid */}
            <div 
              className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_#f8f9fa_20%,_#f8f9fa_21%,_transparent_21%),_radial-gradient(circle,_transparent_20%,_#f8f9fa_20%,_#f8f9fa_21%,_transparent_21%)] bg-[length:40px_40px] opacity-40"
              style={{ backgroundPosition: "0 0, 20px 20px" }}
            ></div>
            
            {/* Central indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-slate-200 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-slate-200"></div>
              <div className="absolute w-8 h-8 rounded-full bg-white shadow-md"></div>
            </div>
            
            {/* Data points */}
            {dataPoints.map((point) => (
              <div 
                key={point.id}
                className={`absolute rounded-full ${point.color} transition-all duration-300 animate-pulse-subtle`}
                style={{ 
                  top: point.position.top, 
                  left: point.position.left,
                  width: point.size,
                  height: point.size,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
            
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

      {/* Time slider */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <Button size="sm" variant="ghost">
            <span className="text-sm">Jan 2023</span>
          </Button>
          
          <div className="flex-1 mx-4">
            <input
              ref={sliderRef}
              type="range"
              min="0"
              max="11"
              defaultValue="11"
              className="w-full accent-primary"
              onChange={handleSliderChange}
            />
          </div>

          <Button size="sm" variant="ghost">
            <span className="text-sm">{currentMonth}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetectionMap;
