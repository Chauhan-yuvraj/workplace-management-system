import { View, Text, Image } from "react-native";
import React from "react";
import { Eye,  Star, Trash2 } from "lucide-react-native";

export default function Card() {
  return (
    <View className="h-full bg-white/70 border border-gray-300 rounded-lg flex items-center p-4">
      <View>
        <Image
          source={require("@/assets/images/bg.jpg")}
          style={{ width: 200, height: 200, borderRadius: 8 }}
        />
      </View>
      <View className="flex w-full py-4  items-start">
        <Text className="text-3xl font-bold text-left max-w-[90%]">
          Chauhan yuvraj Singh
        </Text>
        <Text className="text-sm text-gray-600 mt-1">
          Visited on: 2024-06-15
        </Text>
        <Text className="text-sm text-gray-600 mt-1">
          Abhyuday Bharat Groups
        </Text>
      </View>
      <View className="flex flex-row w-full border min-h-52 rounded-md  justify-between mt-4">
        <Text>a</Text>
      </View>

      <View className="flex flex-row gap-x-8 mt-4 p-2 rounded-md justify-end">
        <View className="border border-gray-300 p-2 rounded-md bg-white">
          <Star color={"black"} />
        </View>
        <View className="border border-gray-300 p-2 rounded-md bg-white">
          <Eye color={"black"} />
        </View>
        <View className="border border-gray-300 p-2 rounded-md ">
          <Trash2 color={"black"} />
        </View>
      </View>
    </View>
  );
}
