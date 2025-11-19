import Background from "@/components/Background";
import Card from "@/components/Card";
import { useAppDispatch } from "@/store/hooks";
import { getRecords } from "@/store/slices/records.slice";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Options() {
  const disptach = useAppDispatch();

  useEffect(() => {
    disptach(getRecords());
  }, [disptach]);

  return (
    <Background>
      <SafeAreaView className="flex-1">
        {/* Make the ScrollView horizontal */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
        >
          <Card />
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
