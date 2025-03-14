
import { useState } from 'react';
import { 
  ArrowUpDown, 
  Calendar, 
  ArrowUp,
  ArrowDown,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface ChangeRecord {
  id: string;
  date: string;
  type: 'Land Use' | 'Infrastructure' | 'Encroachment' | 'Environmental';
  area: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'Reviewed' | 'Escalated';
}

interface ChangeDataTableProps {
  data: ChangeRecord[];
}

const ChangeDataTable = ({ data }: ChangeDataTableProps) => {
  const [activeTab, setActiveTab] = useState('all');
  const [sortField, setSortField] = useState<keyof ChangeRecord>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof ChangeRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredData = activeTab === 'all' 
    ? data 
    : data.filter(record => record.type.toLowerCase().replace(' ', '-') === activeTab);

  const sortedData = [...filteredData].sort((a, b) => {
    const comparison = a[sortField] > b[sortField] ? 1 : -1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const getSeverityBadge = (severity: ChangeRecord['severity']) => {
    switch (severity) {
      case 'Critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'High':
        return <Badge className="bg-blue-500">High</Badge>;
      case 'Medium':
        return <Badge variant="outline" className="text-gray-500 border-gray-300">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline" className="text-green-500 border-green-300">Low</Badge>;
    }
  };

  const getStatusBadge = (status: ChangeRecord['status']) => {
    switch (status) {
      case 'Pending':
        return (
          <div className="flex items-center text-amber-500">
            <div className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></div>
            Pending
          </div>
        );
      case 'Reviewed':
        return (
          <div className="flex items-center text-green-500">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
            Reviewed
          </div>
        );
      case 'Escalated':
        return (
          <div className="flex items-center text-red-500">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
            Escalated
          </div>
        );
    }
  };

  const getTypeBadge = (type: ChangeRecord['type']) => {
    switch (type) {
      case 'Land Use':
        return <Badge className="bg-green-500">Land Use</Badge>;
      case 'Infrastructure':
        return <Badge className="bg-blue-500">Infrastructure</Badge>;
      case 'Encroachment':
        return <Badge className="bg-red-500">Encroachment</Badge>;
      case 'Environmental':
        return <Badge className="bg-amber-500">Environmental</Badge>;
    }
  };

  const SortIndicator = ({ field }: { field: keyof ChangeRecord }) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4" />
    );
  };

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-sm border mt-6 animate-fade-in-up">
      <div className="p-6 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Change Detection Data</h2>
        <Button variant="outline">
          Export
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 pt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Changes</TabsTrigger>
            <TabsTrigger value="land-use">Land Use</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="encroachment">Encroachment</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="m-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="p-4 text-left font-medium text-sm">
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto font-medium text-sm flex items-center" 
                      onClick={() => handleSort('date')}
                    >
                      <Calendar className="mr-1 h-4 w-4" />
                      Date
                      <SortIndicator field="date" />
                    </Button>
                  </th>
                  <th className="p-4 text-left font-medium text-sm">
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto font-medium text-sm flex items-center" 
                      onClick={() => handleSort('type')}
                    >
                      Change Type
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                      <SortIndicator field="type" />
                    </Button>
                  </th>
                  <th className="p-4 text-left font-medium text-sm">
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto font-medium text-sm flex items-center" 
                      onClick={() => handleSort('area')}
                    >
                      Area
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                      <SortIndicator field="area" />
                    </Button>
                  </th>
                  <th className="p-4 text-left font-medium text-sm">
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto font-medium text-sm flex items-center" 
                      onClick={() => handleSort('severity')}
                    >
                      Severity
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                      <SortIndicator field="severity" />
                    </Button>
                  </th>
                  <th className="p-4 text-left font-medium text-sm">
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto font-medium text-sm flex items-center" 
                      onClick={() => handleSort('status')}
                    >
                      Status
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                      <SortIndicator field="status" />
                    </Button>
                  </th>
                  <th className="p-4 text-right font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm">{record.date}</td>
                    <td className="p-4">{getTypeBadge(record.type)}</td>
                    <td className="p-4 text-sm">{record.area}</td>
                    <td className="p-4">{getSeverityBadge(record.severity)}</td>
                    <td className="p-4 text-sm">{getStatusBadge(record.status)}</td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {sortedData.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChangeDataTable;
