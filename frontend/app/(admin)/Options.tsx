import Background from "@/components/Background";
import Card from "@/components/Card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getRecords } from "@/store/slices/records.slice";
import { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Options() {
  const dispatch = useAppDispatch();

  const { records, status, error } = useAppSelector((state) => state.records);

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching records:", error);
    } else {
      console.log("Records fetched successfully:", records.length);
    }
  }, [error, records]);
  // Inside Options.tsx, near the top of the return statement:
  if (status === "loading") {
    return (
      <Background>
        <SafeAreaView className="flex-1 justify-center items-center">
          <Text>Loading visitors...</Text>
        </SafeAreaView>
      </Background>
    );
  }
  // Add error handling similarly if status === 'failed'
  return (
    <Background>
      <SafeAreaView className="flex-1">
        {/* Make the ScrollView horizontal */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
        >
          {records.map((record) => (
            <Card key={record.id} record={record} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
