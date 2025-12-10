import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import Background from "@/components/ui/background";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisitsThunk, setSelectedVisit } from "@/store/slices/visit.slice";
import { Visit } from "@/store/types/visit";
import { AppDispatch, RootState } from "@/store/store";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectVisit() {
  const dispatch = useDispatch<AppDispatch>();
  const { visits, loading, error } = useSelector((state: RootState) => state.visits);

  useEffect(() => {
    // Fetch visits that are currently CHECKED_IN (so they can check out and give feedback)
    // Or PENDING if they are checking in? 
    // Assuming "Feedback" implies checking out.
    dispatch(fetchVisitsThunk({ status: 'CHECKED_IN' }));
  }, [dispatch]);

  const handleVisitSelection = (visit: Visit) => {
    dispatch(setSelectedVisit(visit));
    router.push("/(canvas)/Canvas");
  };

  if (loading === "pending" && visits.length === 0) {
    return (
      <Background image={require("@/assets/images/background.jpg")}>
        <ActivityIndicator size="large" color="#FFFFFF" className="flex-1" />
      </Background>
    );
  }

  return (
    <Background image={require("@/assets/images/background.jpg")}>
      <SafeAreaView className="flex-1">
        <Text className="text-2xl font-bold text-white text-center mt-8 mb-4">
          Select Your Visit
        </Text>
        
        {error && <Text className="text-red-400 text-center p-4">{error}</Text>}
        
        <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
          {visits.length === 0 ? (
             <Text className="text-white text-center text-lg">No active visits found.</Text>
          ) : (
            visits.map((visit) => (
              <TouchableOpacity
                key={visit._id}
                onPress={() => handleVisitSelection(visit)}
                className="bg-white/90 p-4 rounded-xl flex-row items-center gap-4 shadow-lg"
              >
                <Image 
                  source={{ uri: visit.visitor.profileImgUri || "https://via.placeholder.com/100" }} 
                  className="w-16 h-16 rounded-full bg-gray-200"
                />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800">{visit.visitor.name}</Text>
                  <Text className="text-gray-600">{visit.visitor.company || "No Company"}</Text>
                  <Text className="text-xs text-gray-500 mt-1">Host: {visit.host.name}</Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-700 text-xs font-bold">Active</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
