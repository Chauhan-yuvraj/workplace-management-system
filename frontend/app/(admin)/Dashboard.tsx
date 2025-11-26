import React from "react";
import { View, Text, ScrollView, StatusBar } from "react-native";
import { Search, Bell, Plus } from "lucide-react-native";
import { Avatar } from "react-native-paper";
// 1. Import the hook instead of the component
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Import Components
import Sidebar from "./Sidebar";
import StatCard from "./StatsCard";
import VisitorRow from "./VisitorRow";
import UpcomingTimeline from "./UpcomingTimeline";
import Background from "@/components/Background";

export default function Options() {
  // 2. Get the safe area values (top, bottom, etc.)
  const insets = useSafeAreaInsets();

  return (
    // 3. Change SafeAreaView to a normal View so colors stretch to the edge
    <Background>
      <View className="flex-1">
        {/* Optional: Make status bar icons dark since background is light */}
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        <View className="flex-1 flex-row h-full">
          {/* Sidebar */}
          <View
            style={{ paddingTop: insets.top }}
            className="bg-surface border-r border-gray-100 hidden md:flex h-full"
          >
            <Sidebar />
          </View>

          {/* Main Content Area */}
          <View className="flex-1">
            {/* Header */}
            {/* 4. Add paddingTop equal to insets.top here */}
            <View
              style={{ paddingTop: insets.top }}
              className="flex-col z-10"
            >
              <View className="h-20 flex-row items-center justify-between px-6">
                <View>
                  <Text className="text-2xl font-bold text-primary">
                    Good Morning, Admin
                  </Text>
                  <Text className="text-xs text-gray-400 font-medium">
                    Tuesday, Oct 24
                  </Text>
                </View>

                <View className="flex-row items-center gap-4">
                  <View className="hidden sm:flex flex-row items-center bg-white px-3 py-2 rounded-full border border-gray-200 w-48">
                    <Search size={16} color="#9CA3AF" />
                    <Text className="text-gray-400 text-xs ml-2">
                      Search...
                    </Text>
                  </View>

                  <Bell size={20} color="#9CA3AF" />
                  <Avatar.Image
                    size={32}
                    source={{ uri: "https://ui-avatars.com/api/?name=Admin" }}
                  />
                </View>
              </View>
            </View>

            {/* Scrollable Dashboard Content */}
            <ScrollView
              className="flex-1 px-6"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: insets.bottom + 20 }} // Add bottom padding for scroll
            >
              {/* 1. Stats Grid */}
              <View className="flex-row flex-wrap -mx-1 mb-6 mt-6">
                <StatCard
                  label="Checked In"
                  value="24"
                  subLabel="visitors"
                  trend="+12%"
                />
                <StatCard label="Expected" value="42" subLabel="scheduled" />
                <StatCard
                  label="Packages"
                  value="8"
                  subLabel="pending"
                  isAlert
                />

                {/* Add Button Tile */}
                <View className="bg-primary p-5 rounded-3xl mb-4 shadow-lg flex-1 min-w-[150px] mx-1 items-center justify-center">
                  <View className="bg-white/20 p-2 rounded-full mb-2">
                    <Plus color="white" size={20} />
                  </View>
                  <Text className="text-white font-medium">New Check-In</Text>
                </View>
              </View>

              {/* 2. Main Content Split */}
              <View className="flex-col lg:flex-row gap-6 pb-10">
                {/* Left: Recent Activity Table */}
                <View className="flex-[2] bg-surface rounded-3xl p-6 shadow-sm border border-gray-100">
                  <View className="flex-row justify-between items-center mb-4 border-b border-gray-50 pb-4">
                    <Text className="font-bold text-lg text-primary">
                      Recent Activity
                    </Text>
                    <Text className="text-sm text-gray-400">View All</Text>
                  </View>

                  <View>
                    <VisitorRow
                      name="Sarah Connor"
                      company="Cyberdyne"
                      host="Miles Dyson"
                      time="09:15 AM"
                      status="Active"
                      image="https://ui-avatars.com/api/?name=Sarah+Connor&background=random"
                    />
                    <VisitorRow
                      name="John Wick"
                      company="Continental"
                      host="Winston"
                      time="10:00 AM"
                      status="Active"
                      image="https://ui-avatars.com/api/?name=John+Wick&background=000&color=fff"
                    />
                    <VisitorRow
                      name="Ellen Ripley"
                      company="Weyland Yutani"
                      host="Burke"
                      time="08:30 AM"
                      status="Departed"
                    />
                  </View>
                </View>

                {/* Right: Timeline & Widget */}
                <View className="flex-1 gap-6">
                  <UpcomingTimeline />

                  {/* Gradient Analytics Widget */}
                  <View className="bg-indigo-600 rounded-3xl p-6 shadow-lg overflow-hidden relative">
                    <View className="absolute -top-10 -right-10 h-32 w-32 bg-white opacity-10 rounded-full" />

                    <Text className="text-indigo-100 text-xs font-medium mb-1">
                      Peak Traffic
                    </Text>
                    <View className="flex-row items-end gap-1 mb-2">
                      <Text className="text-3xl font-bold text-white">
                        02:00
                      </Text>
                      <Text className="text-sm text-indigo-200 mb-1">PM</Text>
                    </View>
                    <Text className="text-xs text-indigo-200 leading-5">
                      Expect a surge in visitors after lunch based on historical
                      data.
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Background>
  );
}
