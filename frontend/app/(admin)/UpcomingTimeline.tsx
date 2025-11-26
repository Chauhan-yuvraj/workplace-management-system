import React from 'react';
import { View, Text } from 'react-native';

interface UpcomingItemProps {
  name: string;
  detail: string;
  time: string;
  color?: string;
}

const UpcomingItem = ({ name, detail, time, color = 'bg-black' }: UpcomingItemProps) => (
  <View className="relative pl-6 pb-6 border-l border-gray-100 last:border-0">
    <View className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full ${color} ring-4 ring-white`} />
    <View className="flex-row justify-between items-start">
      <View>
        <Text className="font-semibold text-sm text-gray-900">{name}</Text>
        <Text className="text-xs text-gray-400">{detail}</Text>
      </View>
      <View className="bg-gray-50 px-2 py-1 rounded">
        <Text className="text-xs font-mono font-medium text-gray-500">{time}</Text>
      </View>
    </View>
  </View>
);

const UpcomingTimeline = () => {
  return (
    <View className="bg-surface rounded-3xl p-6 shadow-sm border border-gray-100">
       <View className="flex-row justify-between items-center mb-6">
          <Text className="font-bold text-gray-800">Upcoming</Text>
       </View>
       <View>
          <UpcomingItem name="Peter Parker" detail="Daily Bugle • Interview" time="11:30" />
          <UpcomingItem name="Diana Prince" detail="Embassy • Lunch" time="01:00" color="bg-gray-300" />
          <UpcomingItem name="Clark Kent" detail="Daily Planet • Drop-off" time="02:15" color="bg-gray-200" />
       </View>
    </View>
  );
};

export default UpcomingTimeline;