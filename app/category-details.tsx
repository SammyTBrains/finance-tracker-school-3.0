import colors from "@/components/myApp/colors";
import CourseInfo from "@/components/myApp/CourseDetails/CourseInfo";
import CourseItemList from "@/components/myApp/CourseDetails/CourseItemList";
import { supabase } from "@/utils/supabase";
import { CategoryData } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
import {
  Link,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function CategoryDetails() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = useState<CategoryData>({
    CategoryItems: [],
    assigned_budget: 0,
    color: "",
    created_at: "",
    created_by: "",
    icon: "",
    id: 0,
    name: "",
  });

  useFocusEffect(
    useCallback(() => {
      categoryId && getCategoryDetail();
    }, [categoryId])
  );

  const getCategoryDetail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("id", categoryId);
    setCategoryData(data?.[0]);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Ionicons name="arrow-back-circle" size={44} color="black" />
        </TouchableOpacity>
        <CourseInfo categoryData={categoryData} />
        <CourseItemList
          categoryData={categoryData}
          setUpdateRecord={() => getCategoryDetail()}
        />
      </ScrollView>
      <Link
        href={{
          pathname: "/add-new-category-item",
          params: { categoryId: categoryData.id },
        }}
        style={styles.addButton}
      >
        <Ionicons name="add-circle" size={60} color={colors.primary} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: "white",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
