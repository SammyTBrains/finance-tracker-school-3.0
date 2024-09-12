import { formatAmount } from "@/utils/functions";
import { CategoryData, CategoryItem } from "@/utils/types";
import { EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, Image } from "react-native";

type CourseItemListProps = {
  categoryData: CategoryData;
};

export default function CourseItemList(props: CourseItemListProps) {
  const [expandItem, setExpandItem] = useState(0);
  return (
    <View className="mt-5">
      <Text className="font-[outfit-bold] text-xl">Item List</Text>

      <View className="mt-4">
        {props.categoryData.CategoryItems?.length > 0 ? (
          props.categoryData.CategoryItems.map((item: CategoryItem, index) => (
            <View key={index} className="mt-3">
              <View className="flex flex-row justify-between items-center">
                <Image
                  source={{ uri: item.image }}
                  className="w-[90px] h-[90px] rounded-2xl"
                />
                <View className="flex-1 ml-3">
                  <Text className="text-xl font-[outfit-bold]">
                    {item.name}
                  </Text>
                  <Text
                    className="font-[outfit] text-greyDarker"
                    numberOfLines={2}
                  >
                    {item.url}
                  </Text>
                </View>
                <Text className="text-base ml-3 font-[outfit-bold]">
                  {item.cost.toLocaleString("en-NG", {
                    style: "currency",
                    currency: "NGN", // Change to Nigerian Naira
                    minimumFractionDigits: 2, // Adjust for desired decimal places
                  })}
                </Text>
              </View>
              {expandItem === index && (
                <View className="flex flex-row gap-3 justify-end">
                  <EvilIcons name="trash" size={34} color="black" />
                  <EvilIcons name="external-link" size={34} color="black" />
                </View>
              )}
              {props.categoryData.CategoryItems.length - 1 != index && (
                <View className="border-[.5px] mt-3 border-grey"></View>
              )}
            </View>
          ))
        ) : (
          <Text className="font-[outfit-bold] text-2xl text-grey">
            No Item Found
          </Text>
        )}
      </View>
    </View>
  );
}
