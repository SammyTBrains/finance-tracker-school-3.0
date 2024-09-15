import { Tabs } from "expo-router";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@/components/myApp/colors";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name="home" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="ai-assistance"
          options={{
            title: "AI Assistance",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="robot-happy"
                size={28}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name="user" color={color} size={28} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
