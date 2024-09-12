import CategoryList from "@/components/myApp/CategoryList";
import CircularChart from "@/components/myApp/CircularChart";
import colors from "@/components/myApp/colors";
import Header from "@/components/myApp/Header";
import { client } from "@/utils/KindeConfig";
import services from "@/utils/services";
import { supabase } from "@/utils/supabase";
import { CategoryData } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, RefreshControl, ScrollView, View } from "react-native";

export default function Home() {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const { email } = await client.getUserDetails();
    let { data: Category, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("created_by", email);

    setCategoryList(Category as CategoryData[]);
    setLoading(false);
  };

  return (
    <View className="flex-1 mt-5">
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategoryList()}
            refreshing={loading}
          />
        }
      >
        <View className="p-5 bg-primary h-[150px]">
          <Header />
        </View>
        <View className="p-5 -mt-20">
          <CircularChart categoryList={categoryList} />
          <CategoryList categoryList={categoryList} />
          {/* <Button onPress={handleLogout} title="Logout" /> */}
        </View>
      </ScrollView>
      <Link href={"/add-new-category"} className="absolute bottom-4 right-4">
        <Ionicons name="add-circle" size={64} color={colors.primary} />
      </Link>
    </View>
  );
}
