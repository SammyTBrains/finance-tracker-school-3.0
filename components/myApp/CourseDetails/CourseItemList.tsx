import { formatAmount } from "@/utils/functions";
import { CategoryData, CategoryItem } from "@/utils/types";
import { View, Text, Image } from "react-native";

type CourseItemListProps = {
  categoryData: CategoryData;
};

export default function CourseItemList(props: CourseItemListProps) {
  return (
    <View className="mt-5">
      <Text className="font-[outfit-bold] text-xl">Item List</Text>

      <View className="mt-4">
        {props.categoryData.CategoryItems.map((item: CategoryItem, index) => (
          <View key={index} className="flex flex-row justify-between">
            <Image
              source={{ uri: item.image }}
              className="w-[70px] h-[70px] rounded-2xl"
            />
            <View className="flex-1 ml-3">
              <Text className="text-xl font-[outfit-bold]">{item.name}</Text>
              <Text className="font-[outfit] text-greyDarker">{item.url}</Text>
            </View>
            <Text className="text-xl font-[outfit-bold]">
              {item.cost.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN", // Change to Nigerian Naira
                minimumFractionDigits: 2, // Adjust for desired decimal places
              })}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
