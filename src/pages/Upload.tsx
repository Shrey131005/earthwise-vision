
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FileUpload from '@/components/ui/FileUpload';
import MapSelector from '@/components/ui/MapSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, Info } from 'lucide-react';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState('');
  const [model, setModel] = useState('random-forest');
  
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile && model !== 'demo') {
      // In a real app, show an error toast here
      console.error('Please upload a file or select an area on the map');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/results');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Upload Data for Classification</h1>
              <p className="text-muted-foreground">
                Upload a satellite image or select an area on the map for land cover classification
              </p>
            </div>
            
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="upload">Upload Image</TabsTrigger>
                <TabsTrigger value="map">Select on Map</TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit}>
                <TabsContent value="upload" className="animate-fade-in-up">
                  <div className="space-y-8">
                    <FileUpload onFileSelected={handleFileSelected} />
                    
                    <div className="bg-secondary/50 rounded-xl p-5 flex items-start space-x-3">
                      <Info size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Supported File Types</h3>
                        <p className="text-sm text-muted-foreground">
                          We accept GeoTIFF, PNG, and JPEG files. For best results, use high-resolution satellite 
                          imagery with visible RGB bands.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="map" className="animate-fade-in-up">
                  <div className="space-y-8">
                    <MapSelector />
                    
                    <div className="bg-secondary/50 rounded-xl p-5 flex items-start space-x-3">
                      <Info size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Area Selection</h3>
                        <p className="text-sm text-muted-foreground">
                          Draw a polygon to select your area of interest, or enter coordinates manually.
                          Note that larger areas may take longer to process.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Processing Options */}
                <div className="mt-8 space-y-6 animate-fade-in">
                  <div>
                    <label className="text-sm font-medium block mb-2">Classification Model</label>
                    <select 
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full p-3 border rounded-md bg-background"
                    >
                      <option value="random-forest">Random Forest (Recommended)</option>
                      <option value="u-net">U-Net Segmentation</option>
                      <option value="cnn">Convolutional Neural Network</option>
                      <option value="demo">Demo (Sample Data)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-2">Email Notification (Optional)</label>
                    <input 
                      type="email"
                      placeholder="your@email.com"
                      value={notificationEmail}
                      onChange={(e) => setNotificationEmail(e.target.value)}
                      className="w-full p-3 border rounded-md bg-background"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll notify you when processing is complete.
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? (
                      <>
                        <Cpu className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Process Image'
                    )}
                  </button>
                </div>
              </form>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;
