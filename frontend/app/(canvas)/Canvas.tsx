import { router } from "expo-router";
import React, { useRef } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// Import serialization utilities and types (These must be correctly implemented)
import { serializesPath, serializesCanvasPages } from "@/utils/serializationUtils";
import { SerializablePathData, SerializableCanvasPage } from "@/store/types/feedback"; 

import Whitebg from "@/assets/background-pattern/Whitebg";
import ColorPalette from "@/components/colorPalette";
import SelectMode from "@/components/SelectMode";
import SelectTool from "@/components/SelectTool";
import SignatureCanvas, {
  SignatureCanvasRef,
} from "@/components/SignatureCanvas";
import ButtonUI from "@/components/ui/button";
import DrawingCanvas, { DrawingCanvasRef } from "@/components/ui/DrawingCanavs";

export default function CanvasScreen() {
  const canvasRef = useRef<DrawingCanvasRef>(null);
  const signatureRef = useRef<SignatureCanvasRef>(null);

  const undoLastPath = () => canvasRef.current?.undo();
  const clearCanvas = () => canvasRef.current?.clear();
  const redoPath = () => canvasRef.current?.redo();

  const handleSubmit = () => {
    const rawSignaturePaths = signatureRef.current?.getSignature() || [];
    const hasSignature = signatureRef.current?.hasSignature();
    const rawCanvasPages = canvasRef.current?.getAllPages() || [];

    if (!hasSignature || rawSignaturePaths.length === 0) {
      Alert.alert("Action Required", "Please provide a signature.");
      return;
    }

    // --- 1. Signature Serialization ---

    // Filter out paths that are definitely invalid before attempting serialization
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

    // Use the utility function to serialize paths (serializesPath must handle PathData properties: path, color, strokeWidth)
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

    console.log("Serialized signature paths count:", serializedSignature.length);
    
    // --- 2. Drawing Pages Serialization ---
    
    // Use the utility function to serialize all pages and their paths (serializesCanvasPages must return SerializableCanvasPage[])
    const serializablePages: SerializableCanvasPage[] = serializesCanvasPages(rawCanvasPages);

    console.log("Serialized canvas pages count:", serializablePages.length);


    // --- 3. Navigation ---
    router.push({
      pathname: "/(canvas)/GuestData",
      params: {
        pages: JSON.stringify(serializablePages),
        signature: JSON.stringify(serializedSignature),
      },
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        className="absolute inset-0 -z-10 opacity-50"
        pointerEvents="none"
      >
        <Whitebg />
      </View>

      <SafeAreaView style={styles.content}>
        <View className="flex-1 flex-row gap-4">
          {/* Left Column */}
          <View style={{ flex: 1 }} className="gap-y-6">
            <View className="bg-white/10 p-1 rounded-lg">
              <ColorPalette />
            </View>

            <View className="bg-white/10 rounded-lg">
              <SelectTool
                onUndo={undoLastPath}
                onClear={clearCanvas}
                onRedo={redoPath}
              />
            </View>

            <SignatureCanvas ref={signatureRef} />

            <SelectMode />

            <View className="gap-y-2">
              <ButtonUI text="Submit" onPress={handleSubmit} />
            </View>
          </View>

          {/* Right Column (Canvas) */}
          <View
            style={styles.canvasWrapper}
            className="bg-white rounded-2xl overflow-hidden border border-white/20"
          >
            <DrawingCanvas ref={canvasRef} />
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 24,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  canvasWrapper: {
    flex: 3,
  },
});