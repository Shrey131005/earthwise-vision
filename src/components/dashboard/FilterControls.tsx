
import { useState } from 'react';
import { Calendar, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FilterControlsProps {
  onApplyFilters: (filters: FilterState) => void;
}

export interface FilterState {
  fromDate: Date | undefined;
  toDate: Date | undefined;
  region: string;
  changeType: string;
}

const FilterControls = ({ onApplyFilters }: FilterControlsProps) => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [region, setRegion] = useState<string>('');
  const [changeType, setChangeType] = useState<string>('');

  const handleApplyFilters = () => {
    onApplyFilters({
      fromDate,
      toDate,
      region,
      changeType,
    });
  };

  const handleReset = () => {
    setFromDate(undefined);
    setToDate(undefined);
    setRegion('');
    setChangeType('');
    onApplyFilters({
      fromDate: undefined,
      toDate: undefined,
      region: '',
      changeType: '',
    });
  };

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-sm border p-6 animate-fade-in-up">
      <h2 className="text-lg font-semibold mb-4">Filters & Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* From Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">From Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !fromDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {fromDate ? fromDate.toLocaleDateString() : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* To Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">To Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !toDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {toDate ? toDate.toLocaleDateString() : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Region */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Region</label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select region">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{region || "Select region"}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="north">North District</SelectItem>
              <SelectItem value="south">South District</SelectItem>
              <SelectItem value="east">East District</SelectItem>
              <SelectItem value="west">West District</SelectItem>
              <SelectItem value="central">Central District</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Change Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Change Type</label>
          <Select value={changeType} onValueChange={setChangeType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>{changeType || "Select type"}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="land-use">Land Use</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="encroachment">Encroachment</SelectItem>
              <SelectItem value="environmental">Environmental</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-3">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterControls;
