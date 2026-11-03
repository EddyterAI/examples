import { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Eddyter, type EddyterRef } from "@eddyter/react-native";

const apiKey = process.env.EXPO_PUBLIC_EDDYTER_API_KEY ?? "";

export default function App() {
  const editorRef = useRef<EddyterRef>(null);
  const [html, setHtml] = useState(
    "<p>Start writing... try selecting text and tapping <strong>Ask AI</strong>.</p>",
  );

  const logContent = () => {
    console.log("Editor content (HTML):", editorRef.current?.getContent());
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <Text style={styles.title}>Eddyter + React Native</Text>
          <Button title="Log HTML" onPress={logContent} />
        </View>

        <Eddyter
          ref={editorRef}
          apiKey={apiKey}
          user={{ id: "user-123", name: "Jane Doe" }}
          initialContent={html}
          mentionUserList={["Alice", "Bob", "Charlie"]}
          onChange={setHtml}
          onError={(error) => console.warn("Eddyter:", error)}
          containerStyle={styles.editor}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: { fontSize: 18, fontWeight: "600" },
  editor: { flex: 1 },
});
