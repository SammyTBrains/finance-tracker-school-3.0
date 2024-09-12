import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";
import { CategoryData, CategoryItem } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
import { formatAmount } from "@/utils/functions";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";

type CourseInfoProps = {
  categoryData: CategoryData;
};

export default function CourseInfo(props: CourseInfoProps) {
  const router = useRouter();

  const [totalCost, setTotalCost] = useState("");
  const [percentageTotal, setPercentageTotal] = useState(0);

  useEffect(() => {
    calculateTotalPercentage();
  }, [props.categoryData]);

  const calculateTotalPercentage = () => {
    let total = 0;
    props.categoryData.CategoryItems.forEach((item: CategoryItem) => {
      total = total + item.cost;
    });

    const formattedTotal = formatAmount(total);
    setTotalCost(formattedTotal);
    let percentageTotal = (total / props.categoryData.assigned_budget) * 100;
    if (percentageTotal > 100) {
      percentageTotal = 100;
    }
    setPercentageTotal(percentageTotal);
  };

  const onDeleteCategory = async () => {
    Alert.alert(
      "Are you sure you want to delete this category?",
      "This is an irreversible action!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("CategoryItems")
              .delete()
              .eq("category_id", props.categoryData.id);

            await supabase
              .from("Category")
              .delete()
              .eq("id", props.categoryData.id);

            router.replace("/(tabs)");
          },
        },
      ]
    );
  };

  return (
    <View>
      <View className="flex flex-row justify-between items-center mt-5">
        <View className="justify-center items-baseline">
          <Text
            className="text-4xl font-[outfit-medium] p-5 overflow-hidden"
            style={{
              backgroundColor: props.categoryData.color,
              borderRadius: 15,
            }}
          >
            {props.categoryData.icon}
          </Text>
        </View>
        <View className="flex-1 ml-5">
          <Text className="font-[outfit-bold] text-2xl">
            {props.categoryData?.name}
          </Text>
          <Text className="font-[outfit] text-[16px]">
            {props.categoryData?.CategoryItems.length} Items
          </Text>
        </View>
        <TouchableOpacity onPress={() => onDeleteCategory()}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
      {/* Progress Bar */}
      <View className="flex flex-row justify-between mt-4">
        <Text className="font-[outfit-bold]">{totalCost}</Text>
        <Text className="font-[outfit]">
          {"Total Budget: "}
          {props.categoryData.assigned_budget.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN", // Change to Nigerian Naira
            minimumFractionDigits: 2, // Adjust for desired decimal places
          })}
        </Text>
      </View>
      <View className="w-full h-[15px] bg-grey rounded-full mt-2">
        <View
          className="bg-primary h-full rounded-full"
          style={{ width: `${percentageTotal}%` }}
        ></View>
      </View>
    </View>
  );
}
