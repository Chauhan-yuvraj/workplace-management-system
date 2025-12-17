const Dashboard = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good Morning, Admin</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      {/* Dashboard content will go here */}
    </div>
  );
};

export default Dashboard;
