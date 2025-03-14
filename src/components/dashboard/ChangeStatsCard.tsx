
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface ChangeData {
  type: string;
  count: number;
  color: string;
}

interface ChangeStatsCardProps {
  totalChanges: number;
  changesData: ChangeData[];
}

const ChangeStatsCard = ({ totalChanges, changesData }: ChangeStatsCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-card rounded-xl shadow-sm border p-6 animate-fade-in-up">
      <div className="flex flex-col justify-center items-center border-r md:border-r-0 md:items-start">
        <h3 className="text-4xl font-bold text-primary">{totalChanges}</h3>
        <p className="text-sm text-muted-foreground">Total Changes</p>
        
        <div className="mt-4 space-y-2 w-full">
          {changesData.map((item) => (
            <div key={item.type} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm">{item.type}</span>
              </div>
              <span className="font-medium">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="col-span-2 h-[200px]">
        <h3 className="text-sm font-medium mb-2">Changes by Category</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={changesData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="count"
              nameKey="type"
              labelLine={false}
            >
              {changesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChangeStatsCard;
