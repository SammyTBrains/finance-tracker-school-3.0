import CircularChart from "@/components/myApp/CircularChart";
import Header from "@/components/myApp/Header";
import { client } from "@/utils/KindeConfig";
import services from "@/utils/services";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      // User was logged out
      await services.storeData("login", "false");
      router.replace("/login");
    }
  };

  const getCategoryList = async () => {
    const { email } = await client.getUserDetails();
    let { data: Category, error } = await supabase
      .from("Category")
      .select("*")
      .eq("created_by", email);

    //  console.log("Data", Category);
  };

  return (
    <View className="mt-5 p-5 bg-primary h-[150px]">
      <Header />
      <CircularChart />
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
}
