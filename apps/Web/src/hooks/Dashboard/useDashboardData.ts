import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchVisits } from "@/store/slices/visitSlice";
import { fetchDeliveries } from "@/store/slices/deliverySlice";
import { fetchEmployees } from "@/store/slices/employeeSlice";
import { fetchVisitors } from "@/store/slices/visitorSlice";

export const useDashboardData = () => {
  const dispatch = useAppDispatch();
  const { visits } = useAppSelector((state) => state.visits);
  const { deliveries } = useAppSelector((state) => state.deliveries);
  const { employees } = useAppSelector((state) => state.employees);
  const { visitors } = useAppSelector((state) => state.visitors);

  useEffect(() => {
    Promise.all([
      dispatch(fetchVisits({})),
      dispatch(fetchDeliveries()),
      dispatch(fetchEmployees()),
      dispatch(fetchVisitors()),
    ]);
  }, [dispatch]);

  const stats = useMemo(() => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const visitsToday = visits.filter((v) =>
      v.scheduledCheckIn.startsWith(todayStr)
    ).length;

    const activeVisits = visits.filter((v) => v.status === "CHECKED_IN").length;

    const pendingDeliveries = deliveries.filter(
      (d) => d.status === "PENDING"
    ).length;

    return {
      visitsToday,
      activeVisits,
      pendingDeliveries,
      totalEmployees: employees.filter((e) => e.isActive).length,
      totalVisitors: visitors.length,
    };
  }, [visits, deliveries, employees, visitors]);

  const chartData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

    return last7Days.map((date) => {
      const dateStr = date.toISOString().split("T")[0];
      const count = visits.filter((v) =>
        v.scheduledCheckIn.startsWith(dateStr)
      ).length;
      return {
        name: days[date.getDay()],
        visits: count,
      };
    });
  }, [visits]);

  const recentActivity = useMemo(() => {
    const visitActivities = visits.map((v) => ({
      type: "visit",
      id: v._id,
      title: `${v.visitor.name} - ${v.purpose}`,
      time: v.updatedAt || v.createdAt,
      status: v.status,
    }));

    const deliveryActivities = deliveries.map((d) => ({
      type: "delivery",
      id: d._id,
      title: `Delivery for ${d.recipientId?.name || "Unknown"}`,
      time: d.updatedAt || d.createdAt,
      status: d.status,
    }));

    return [...visitActivities, ...deliveryActivities]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 5);
  }, [visits, deliveries]);

  return {
    stats,
    chartData,
    recentActivity,
  };
};
