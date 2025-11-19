import { Stack } from "expo-router";
import { Text } from "react-native";


export default function GuestLayout() {
  // REMOVE: const router = useRouter(); // NO LONGER NEEDED HERE

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#000",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="selectGuest"
        options={{
          headerTitle: () => (
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#000" }}>
              Select the Guest
            </Text>
          ),
        }}
      />
    </Stack>
  );
}
