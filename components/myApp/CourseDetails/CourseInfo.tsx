import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { CategoryData, CategoryItem } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";

type CourseInfoProps = {
  categoryData: CategoryData;
};

export default function CourseInfo(props: CourseInfoProps) {
  const [totalCost, setTotalCost] = useState("");
  const [percentageTotal, setPercentageTotal] = useState(0);

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN", // Change to Nigerian Naira
      minimumFractionDigits: 2, // Adjust for desired decimal places
    });
  };

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
    const percentageTotal = (total / props.categoryData.assigned_budget) * 100;
    setPercentageTotal(percentageTotal);
  };

  return (
    <View>
      <View className="flex flex-row justify-between items-center mt-5">
        <View className="justify-center items-baseline">
          <Text
            className="text-2xl font-[outfit-medium] p-5 overflow-hidden"
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
        <Ionicons name="trash" size={24} color="red" />
      </View>
      {/* Progress Bar */}
      <View className="flex flex-row justify-between mt-4">
        <Text className="font-[outfit-bold]">{totalCost}</Text>
        <Text className="font-[outfit]">
          Total Budget:{props.categoryData.assigned_budget}
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
