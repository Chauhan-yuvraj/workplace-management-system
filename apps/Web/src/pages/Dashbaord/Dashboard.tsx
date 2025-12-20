import { Link } from "react-router-dom";
import {
  Users,
  Package,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { VisitsChart } from "@/components/Dashboard/VisitsChart";
import { RecentActivity } from "@/components/Dashboard/RecentActivity";
import { useDashboardData } from "@/hooks/Dashboard/useDashboardData";

const Dashboard = () => {
  const { stats, chartData, recentActivity } = useDashboardData();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of today's activities and statistics.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/dashboard/visits">Schedule Visit</Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard/deliveries">Record Delivery</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Total Visits Today"
          value={stats.visitsToday}
          icon={CalendarCheck}
          trend="+12% from yesterday"
          trendUp={true}
        />
        <StatsCard
          title="Active Visits"
          value={stats.activeVisits}
          icon={Users}
          description="Currently on premises"
        />
        <StatsCard
          title="Pending Deliveries"
          value={stats.pendingDeliveries}
          icon={Package}
          description="Waiting for collection"
          alert={stats.pendingDeliveries > 0}
        />
        <StatsCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          description="Registered in system"
        />
        <StatsCard
          title="Total Visitors"
          value={stats.totalVisitors}
          icon={Users}
          description="Registered in system"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <VisitsChart data={chartData} />

        {/* Recent Activity */}
        <RecentActivity activities={recentActivity} />
      </div>
    </div>
  );
};

export default Dashboard;
