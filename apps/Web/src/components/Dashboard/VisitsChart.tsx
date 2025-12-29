import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VisitsChartProps {
  data: { name: string; visits: number }[];
}

export const VisitsChart: React.FC<VisitsChartProps> = ({ data }) => {
  const [barSize, setBarSize] = useState(40);

  useEffect(() => {
    const updateBarSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setBarSize(25);
      } else if (width < 1024) {
        setBarSize(35);
      } else {
        setBarSize(40);
      }
    };

    updateBarSize();
    window.addEventListener('resize', updateBarSize);
    return () => window.removeEventListener('resize', updateBarSize);
  }, []);

  return (
    <div className="lg:col-span-2 bg-card rounded-xl border shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
        <h3 className="font-semibold text-base sm:text-lg">Weekly Visits Overview</h3>
        <Select defaultValue="7days">
          <SelectTrigger className="w-full sm:w-45">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[250px] sm:h-[300px] lg:h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888888", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888888", fontSize: 11 }}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar
              dataKey="visits"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              barSize={barSize}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
