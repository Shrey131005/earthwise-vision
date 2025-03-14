
import { Bell, AlertCircle, ChevronRight, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'critical' | 'high' | 'medium' | 'low';
  time: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  const getAlertBadge = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      case 'high':
        return <Badge className="bg-blue-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-gray-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
    }
  };

  const getAlertDot = (type: Alert['type']) => {
    const baseClasses = "w-2 h-2 rounded-full mr-2";
    
    switch (type) {
      case 'critical':
        return <div className={cn(baseClasses, "bg-red-500")}></div>;
      case 'high':
        return <div className={cn(baseClasses, "bg-blue-500")}></div>;
      case 'medium':
        return <div className={cn(baseClasses, "bg-gray-500")}></div>;
      case 'low':
        return <div className={cn(baseClasses, "bg-green-500")}></div>;
    }
  };

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-sm border h-full animate-fade-in-up">
      <div className="p-6 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Alerts</h2>
          {alerts.length > 0 && (
            <Badge className="bg-red-500">{alerts.length} new</Badge>
          )}
        </div>
        <Button variant="ghost" size="sm">
          Mark all read
        </Button>
      </div>
      
      <div className="divide-y max-h-[600px] overflow-auto">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 hover:bg-muted/30 transition-colors group">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getAlertDot(alert.type)}
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium">{alert.title}</h3>
                    {getAlertBadge(alert.type)}
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={16} />
                </Button>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">No alerts</h3>
            <p className="text-sm text-muted-foreground">
              You don't have any alerts at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;
