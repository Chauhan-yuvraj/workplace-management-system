import React from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface PageControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
}

export const PageControls: React.FC<PageControlsProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  searchPlaceholder = "Search...",
  children,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        {children}
        {viewMode && onViewModeChange && (
          <div className="flex items-center border rounded-md bg-background p-1">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-sm transition-colors ${
                viewMode === "grid"
                  ? "bg-secondary text-secondary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary/50"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-sm transition-colors ${
                viewMode === "list"
                  ? "bg-secondary text-secondary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary/50"
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
