import CheckAuth from "@/components/myApp/CheckAuth";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { KindeAuthProvider } from "@kinde/expo";
import { YOUR_KINDE_CLIENT_ID } from "@/env";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <KindeAuthProvider
      config={{
        domain: "https://elohiminnovations.kinde.com", // Required
        clientId: YOUR_KINDE_CLIENT_ID, // Required
        // Optional (default: "openid profile email offline")
        scopes: "openid profile email offline",
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="add-new-category"
          options={{
            presentation: "modal",
            headerShown: true,
            headerTitle: "Add New Category",
          }}
        />
        <Stack.Screen
          name="add-new-category-item"
          options={{
            presentation: "modal",
            headerShown: true,
            headerTitle: "Add New Category Item",
          }}
        />
      </Stack>
      <CheckAuth />
    </KindeAuthProvider>
  );
}
