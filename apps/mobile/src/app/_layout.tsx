import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import {
  SessionProvider,
  useSession,
} from "../presentation/auth/session-context";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SessionProvider>
      <SessionNavigator />
    </SessionProvider>
  );
}

function SessionNavigator() {
  const { isAuthenticated, isRestoring } = useSession();

  useEffect(() => {
    if (!isRestoring) void SplashScreen.hideAsync();
  }, [isRestoring]);

  if (isRestoring) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2357D9" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F7FC",
  },
});
