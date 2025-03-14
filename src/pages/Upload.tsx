
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FilterControls, { FilterState } from '@/components/dashboard/FilterControls';
import DetectionMap from '@/components/dashboard/DetectionMap';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import ChangeStatsCard from '@/components/dashboard/ChangeStatsCard';
import ChangeDataTable from '@/components/dashboard/ChangeDataTable';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Mock data for the dashboard
const mockAlerts = [
  {
    id: '1',
    title: 'Critical Encroachment Detected',
    description: 'Unauthorized construction detected in East District, Zone 3',
    type: 'critical' as const,
    time: '10 minutes ago'
  },
  {
    id: '2',
    title: 'Environmental Change Alert',
    description: 'Significant vegetation loss in West District, Green Zone',
    type: 'high' as const,
    time: '1 hour ago'
  },
  {
    id: '3',
    title: 'Infrastructure Development',
    description: 'New road construction detected in Central District',
    type: 'medium' as const,
    time: '3 hours ago'
  },
  {
    id: '4',
    title: 'Land Use Change',
    description: 'Agriculture to residential conversion in South District',
    type: 'low' as const,
    time: '1 day ago'
  },
  {
    id: '5',
    title: 'Potential Flooding Risk',
    description: 'Water body expansion detected in North District',
    type: 'medium' as const,
    time: '2 days ago'
  }
];

const mockChangeData = [
  {
    type: 'Land Use',
    count: 24,
    color: '#4ade80'
  },
  {
    type: 'Infrastructure',
    count: 13,
    color: '#3b82f6'
  },
  {
    type: 'Encroachment',
    count: 8,
    color: '#ef4444'
  },
  {
    type: 'Environmental',
    count: 17,
    color: '#f59e0b'
  }
];

const mockTableData = [
  {
    id: '1',
    date: '12/20/2023',
    type: 'Land Use' as const,
    area: 'South District, Residential Area',
    severity: 'Medium' as const,
    status: 'Pending' as const
  },
  {
    id: '2',
    date: '12/15/2023',
    type: 'Environmental' as const,
    area: 'West District, Green Zone',
    severity: 'Critical' as const,
    status: 'Pending' as const
  },
  {
    id: '3',
    date: '12/10/2023',
    type: 'Infrastructure' as const,
    area: 'Central District, Main Road',
    severity: 'Low' as const,
    status: 'Reviewed' as const
  },
  {
    id: '4',
    date: '12/05/2023',
    type: 'Encroachment' as const,
    area: 'East District, Zone 3',
    severity: 'High' as const,
    status: 'Escalated' as const
  },
  {
    id: '5',
    date: '12/01/2023',
    type: 'Land Use' as const,
    area: 'North District, Block A',
    severity: 'Medium' as const,
    status: 'Reviewed' as const
  }
];

const Upload = () => {
  const [filteredAlerts, setFilteredAlerts] = useState(mockAlerts);
  const [filteredTableData, setFilteredTableData] = useState(mockTableData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const handleApplyFilters = (filters: FilterState) => {
    // In a real application, this would filter data based on the filters
    // For this demo, we'll just show a toast notification
    toast({
      title: "Filters Applied",
      description: `From: ${filters.fromDate?.toLocaleDateString() || 'Any'}, To: ${filters.toDate?.toLocaleDateString() || 'Any'}, Region: ${filters.region || 'All'}, Type: ${filters.changeType || 'All'}`,
    });
    
    // Simulate filtered data
    if (filters.region || filters.changeType) {
      setFilteredAlerts(mockAlerts.slice(0, 3));
      setFilteredTableData(mockTableData.slice(0, 3));
    } else {
      setFilteredAlerts(mockAlerts);
      setFilteredTableData(mockTableData);
    }
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  const totalChanges = mockChangeData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="min-h-screen flex flex-col dark:bg-background">
      <Navbar />
      
      <div className="sticky top-0 z-40 bg-white dark:bg-background border-b mt-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">GIS Change Detection Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="animate-fade-in">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button variant="outline">
              Alerts
              <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full animate-pulse">
                3
              </span>
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-grow pt-6 pb-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <FilterControls onApplyFilters={handleApplyFilters} />
              <DetectionMap />
              <ChangeStatsCard totalChanges={totalChanges} changesData={mockChangeData} />
              <ChangeDataTable data={filteredTableData} />
            </div>
            
            <div className="lg:col-span-1">
              <AlertsPanel alerts={filteredAlerts} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Upload;
