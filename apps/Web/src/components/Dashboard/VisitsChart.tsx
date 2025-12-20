import React from "react";
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
  return (
    <div className="lg:col-span-2 bg-card rounded-xl border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Weekly Visits Overview</h3>
        <Select defaultValue="7days">
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888888", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888888", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="visits"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
