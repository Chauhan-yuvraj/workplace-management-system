import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { updateVisitThunk } from "@/store/slices/visit.slice";
import { saveRecord } from "@/store/slices/records.slice";

// Import serialization utilities and types
import { serializesPath } from "@/utils/serializationUtils";
import { SerializablePathData } from "@/store/types/feedback";

import Whitebg from "@/assets/background-pattern/Whitebg";
import SignatureCanvas, {
  SignatureCanvasRef,
} from "@/components/SignatureCanvas";
import ButtonUI from "@/components/ui/button";

export default function CanvasScreen() {
  const signatureRef = useRef<SignatureCanvasRef>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { selectedVisit } = useSelector((state: RootState) => state.visits);

  const handleSubmit = async () => {
    const rawSignaturePaths = signatureRef.current?.getSignature() || [];
    const hasSignature = signatureRef.current?.hasSignature();

    if (!hasSignature || rawSignaturePaths.length === 0) {
      Alert.alert("Action Required", "Please provide a signature.");
      return;
    }

    // --- 1. Signature Serialization ---
    const validSignaturePaths = rawSignaturePaths.filter(
      (pathData) =>
        pathData &&
        pathData.path &&
        typeof pathData.path.toSVGString === "function"
    );

    if (validSignaturePaths.length === 0) {
      Alert.alert(
        "Action Required",
        "The signature provided was invalid. Please try again."
      );
      return;
    }

    const serializedSignature: SerializablePathData[] = validSignaturePaths
      .map(serializesPath)
      .filter((p): p is SerializablePathData => p !== null);

    if (serializedSignature.length === 0) {
      Alert.alert(
        "Action Required",
        "Failed to serialize signature. Please try again."
      );
      return;
    }

    // --- 2. Check for Selected Visit ---
    if (selectedVisit) {
      try {
        // 1. Update Visit (Checkout & Feedback)
        await dispatch(
          updateVisitThunk({
            id: selectedVisit._id,
            payload: {
              status: "CHECKED_OUT",
              feedback: {
                comment: feedbackText,
                rating: 5, // Default rating
              },
            },
          })
        ).unwrap();

        // 2. Save Record (for historical/legal purposes with signature)
        await dispatch(
          saveRecord({
            guestData: {
              guestName: selectedVisit.visitor.name,
              guestEmail: selectedVisit.visitor.email,
              guestCompany: selectedVisit.visitor.company,
              guestImgUri: selectedVisit.visitor.profileImgUri,
            },
            canvasPages: [],
            signaturePaths: serializedSignature,
            visitType: selectedVisit.purpose || "General",
            feedbackText: feedbackText,
          })
        ).unwrap();

        Alert.alert("Success", "Thank you for your feedback!", [
          { text: "OK", onPress: () => router.replace("/") },
        ]);
      } catch (error) {
        console.error("Submission failed:", error);
        Alert.alert("Error", "Failed to submit feedback. Please try again.");
      }
    } else {
      // --- 3. Navigation (Old Flow) ---
      router.push({
        pathname: "/(canvas)/GuestData",
        params: {
          pages: JSON.stringify([]), // Empty pages as we removed drawing
          signature: JSON.stringify(serializedSignature),
          feedbackText: feedbackText,
        },
      });
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="absolute inset-0 -z-10 opacity-50" pointerEvents="none">
        <Whitebg />
      </View>

      <SafeAreaView style={styles.content}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, gap: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View>
              <Text className="text-2xl font-bold text-gray-800">
                Your Feedback
              </Text>
              <Text className="text-gray-500">
                Please write your feedback and sign below.
              </Text>
            </View>

            {/* Text Input Area */}
            <View className="bg-white rounded-2xl p-4 border border-gray-200 min-h-[200px] shadow-sm">
              <TextInput
                multiline
                placeholder="Write your feedback here..."
                style={styles.textInput}
                value={feedbackText}
                onChangeText={setFeedbackText}
                textAlignVertical="top"
              />
            </View>

            {/* Signature Area */}
            <View className="gap-y-2">
              <Text className="text-lg font-semibold text-gray-700">
                Signature
              </Text>
              <View className="h-64 bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <SignatureCanvas ref={signatureRef} />
              </View>
              <View className="flex-row justify-end">
                <Text
                  onPress={() => signatureRef.current?.clear()}
                  className="text-red-500 font-medium px-2 py-1"
                >
                  Clear Signature
                </Text>
              </View>
            </View>

            {/* Submit Button */}
            <View className="mb-8">
              <ButtonUI text={selectedVisit ? "Submit" : "Next"} onPress={handleSubmit} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 24,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    minHeight: 150,
  },
});