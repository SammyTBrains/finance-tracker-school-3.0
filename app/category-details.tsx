import colors from "@/components/myApp/colors";
import CourseInfo from "@/components/myApp/CourseDetails/CourseInfo";
import CourseItemList from "@/components/myApp/CourseDetails/CourseItemList";
import { supabase } from "@/utils/supabase";
import { CategoryData } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";

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

  useEffect(() => {
    // console.log(categoryId);
    categoryId && getCategoryDetail();
  }, [categoryId]);

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
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 mt-5">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={44} color={"black"} />
      </TouchableOpacity>
      <CourseInfo categoryData={categoryData} />
      <CourseItemList categoryData={categoryData} />

      <Link
        href={{
          pathname: "/add-new-category-item",
          params: { categoryId: categoryData.id },
        }}
        className="absolute bottom-4 right-4"
      >
        <Ionicons name="add-circle" size={60} color={colors.primary} />
      </Link>
    </View>
  );
}
