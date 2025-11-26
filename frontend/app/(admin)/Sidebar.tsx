import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LayoutGrid, Users, Send, PieChart, LogOut } from "lucide-react-native";

interface SidebarItemProps {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active }: SidebarItemProps) => (
  <TouchableOpacity
    className={`flex-row items-center px-4 py-3 rounded-xl mb-1 ${
      active ? "bg-gray-50" : "hover:bg-gray-50"
    }`}
  >
    <Icon size={20} color={active ? "#111827" : "#9CA3AF"} />
    {/* Hidden on mobile, shown on tablet/desktop logic would be handled by parent layout styling */}
    <Text
      className={`ml-3 font-medium text-sm ${
        active ? "text-primary" : "text-gray-400"
      }`}
    >
      {label}
    </Text>
    {active && (
      <View className="absolute left-0 h-6 w-1 bg-primary rounded-r-full" />
    )}
  </TouchableOpacity>
);

const Sidebar = () => {
  return (
    <View className="w-64 bg-surface border-r border-gray-100 flex-col justify-between pt-8 pb-8 hidden md:flex">
      <View>
        {/* Logo */}
        <View className="flex-row items-center px-8 mb-8">
          <View className=" bg-primary rounded-lg p-1 items-center justify-center mr-3">
            <Image
              source={require("../../assets/images/icon.png")}
              className="h-8 w-8"
            />
          </View>
          <Text className="font-bold text-xl text-primary">
            Abhyuday<Text className="text-gray-400">Bharat</Text>
          </Text>
        </View>

        {/* Nav */}
        <View className="px-4">
          <SidebarItem icon={LayoutGrid} label="Dashboard" active />
          <SidebarItem icon={Users} label="Visitors Log" />
          <SidebarItem icon={Send} label="Invites" />
          <SidebarItem icon={PieChart} label="Analytics" />
        </View>
      </View>

      {/* Footer */}
      <View className="px-4">
        <SidebarItem icon={LogOut} label="Log Out" />
      </View>
    </View>
  );
};

export default Sidebar;
