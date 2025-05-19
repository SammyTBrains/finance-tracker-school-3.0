import CategoryList from "@/components/myApp/CategoryList";
import CircularChart from "@/components/myApp/CircularChart";
import colors from "@/components/myApp/colors";
import Header from "@/components/myApp/Header";
import services from "@/utils/services";
import { supabase } from "@/utils/supabase";
import { CategoryData } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  RefreshControl,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";

export default function Home() {
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setLoading(true);
    const email = (await services.getData("userEmail")) || "";
    console.log("email", email);
    let { data: Category, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("created_by", email)
      .order("created_at", { ascending: false });

    setCategoryList(Category as CategoryData[]);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={getCategoryList} refreshing={loading} />
        }
      >
        <View style={styles.headerContainer}>
          <Header />
        </View>
        <View style={styles.contentContainer}>
          <CircularChart categoryList={categoryList} />
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>
      <Link href={"/add-new-category"} style={styles.addButton}>
        <Ionicons name="add-circle" size={64} color={colors.primary} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#e0e3f9",
  },
  headerContainer: {
    padding: 20,
    backgroundColor: colors.primary,
    height: 150,
  },
  contentContainer: {
    padding: 20,
    marginTop: -80,
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
