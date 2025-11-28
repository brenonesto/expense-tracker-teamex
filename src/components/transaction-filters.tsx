import { FilterIcon, XIcon } from "lucide-react";
import { useId } from "react";
import {
  TransactionCategory,
  type TransactionFilters,
} from "@/types/transaction";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TransactionFiltersComponentProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
}

function TransactionFiltersComponent({
  filters,
  onFiltersChange,
}: TransactionFiltersComponentProps) {
  const categoryId = useId();
  const dateFromId = useId();
  const dateToId = useId();
  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      onFiltersChange({
        ...filters,
        category: undefined,
      });
    } else {
      onFiltersChange({
        ...filters,
        category: value as TransactionCategory,
      });
    }
  };

  const handleDateFromChange = (value: string) => {
    let fromDate: Date | undefined = undefined;
    if (value) {
      // Parse the date string and create a Date in local timezone
      const [year, month, day] = value.split("-").map(Number);
      fromDate = new Date(year, month - 1, day);
    }
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        from: fromDate,
      },
    });
  };

  const handleDateToChange = (value: string) => {
    let toDate: Date | undefined = undefined;
    if (value) {
      // Parse the date string and create a Date in local timezone
      const [year, month, day] = value.split("-").map(Number);
      toDate = new Date(year, month - 1, day);
    }
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        to: toDate,
      },
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      category: undefined,
      dateRange: undefined,
    });
  };

  const hasActiveFilters =
    filters.category || filters.dateRange?.from || filters.dateRange?.to;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-gray-600 hover:text-gray-900"
          >
            <XIcon className="w-4 h-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor={categoryId} className="text-sm font-medium">
            Category
          </Label>
          <Select
            value={filters.category ?? "all"}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger id={categoryId} className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.values(TransactionCategory).map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={dateFromId} className="text-sm font-medium">
            From Date
          </Label>
          <Input
            type="date"
            id={dateFromId}
            value={
              filters.dateRange?.from
                ? filters.dateRange.from.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => handleDateFromChange(e.target.value)}
            max={
              filters.dateRange?.to
                ? filters.dateRange.to.toISOString().split("T")[0]
                : undefined
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={dateToId} className="text-sm font-medium">
            To Date
          </Label>
          <Input
            type="date"
            id={dateToId}
            value={
              filters.dateRange?.to
                ? filters.dateRange.to.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => handleDateToChange(e.target.value)}
            min={
              filters.dateRange?.from
                ? filters.dateRange.from.toISOString().split("T")[0]
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionFiltersComponent;
