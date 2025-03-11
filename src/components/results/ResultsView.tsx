
import { useState } from 'react';
import { Download, Share2, ZoomIn, ZoomOut } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Sample data - in a real app this would come from your API
const sampleData = [
  { name: 'Urban', value: 32, color: '#6e7881' },
  { name: 'Water', value: 18, color: '#1979ab' },
  { name: 'Vegetation', value: 42, color: '#4e7a3e' },
  { name: 'Barren', value: 8, color: '#b99c7d' },
];

const ResultsView = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(zoomLevel + 0.25);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.25);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-background rounded-xl border overflow-hidden shadow-subtle">
          <div className="p-4 border-b">
            <h3 className="font-medium">Classification Result</h3>
          </div>
          
          {/* Before & After Slider */}
          <div className="relative h-[400px] overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1569974498991-d3c12a504f95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')",
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center'
              }}
            ></div>
            
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80')", 
                width: `${sliderPosition}%`,
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'left center'
              }}
            ></div>
            
            {/* Slider handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-md cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center">
                <div className="w-4 h-0.5 bg-gray-400"></div>
              </div>
            </div>

            {/* Slider Inputs */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute bottom-0 left-0 right-0 z-10 opacity-0 cursor-ew-resize h-16"
            />

            {/* Zoom controls */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2">
              <button 
                onClick={handleZoomIn}
                className="p-2 rounded-md bg-background/90 backdrop-blur-sm shadow-sm border"
              >
                <ZoomIn size={16} />
              </button>
              <button 
                onClick={handleZoomOut}
                className="p-2 rounded-md bg-background/90 backdrop-blur-sm shadow-sm border"
              >
                <ZoomOut size={16} />
              </button>
            </div>

            {/* Labels */}
            <div className="absolute top-3 left-3 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-md text-xs font-medium shadow-sm border">
              Original
            </div>
            <div className="absolute top-3 right-[calc(100%-50%+12px)] px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-md text-xs font-medium shadow-sm">
              Classified
            </div>
          </div>
          
          {/* Legend */}
          <div className="p-4 border-t flex flex-wrap gap-3">
            {sampleData.map((entry) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-xs">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-background rounded-xl border overflow-hidden shadow-subtle p-4">
          <h3 className="font-medium mb-3">Download Results</h3>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm">
              <Download size={16} />
              <span>GeoTIFF</span>
            </button>
            <button className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-sm">
              <Download size={16} />
              <span>PNG</span>
            </button>
            <button className="inline-flex items-center space-x-2 px-4 py-2 rounded-md border text-sm ml-auto">
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Statistics Panel */}
        <div className="bg-background rounded-xl border overflow-hidden shadow-subtle">
          <div className="p-4 border-b">
            <h3 className="font-medium">Land Cover Statistics</h3>
          </div>
          
          <div className="p-4">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sampleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sampleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Processing Information */}
        <div className="bg-background rounded-xl border overflow-hidden shadow-subtle">
          <div className="p-4 border-b">
            <h3 className="font-medium">Processing Details</h3>
          </div>
          
          <div className="divide-y">
            <div className="p-4 grid grid-cols-2">
              <span className="text-sm text-muted-foreground">Model Used</span>
              <span className="text-sm font-medium text-right">Random Forest</span>
            </div>
            <div className="p-4 grid grid-cols-2">
              <span className="text-sm text-muted-foreground">Accuracy</span>
              <span className="text-sm font-medium text-right">92.8%</span>
            </div>
            <div className="p-4 grid grid-cols-2">
              <span className="text-sm text-muted-foreground">Processing Time</span>
              <span className="text-sm font-medium text-right">12.3 seconds</span>
            </div>
            <div className="p-4 grid grid-cols-2">
              <span className="text-sm text-muted-foreground">Date Processed</span>
              <span className="text-sm font-medium text-right">Jun 12, 2023</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
