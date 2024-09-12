import { CategoryItem } from "@/utils/types";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

type CategoryListProps = {
  categoryList: any[] | null;
};

export default function CategoryList(props: CategoryListProps) {
  const router = useRouter();

  const onCategoryClick = (category: any) => {
    router.push({
      pathname: "/category-details",
      params: { categoryId: category.id },
    });
  };

  // const amount = 5000;

  // const formattedAmount = amount.toLocaleString("en-NG", {
  //   style: "currency",
  //   currency: "NGN", // Change to Nigerian Naira
  //   minimumFractionDigits: 2, // Adjust for desired decimal places
  // });

  const calculateTotalCost = (categoryItems: CategoryItem[]) => {
    let totalCost = 0;
    categoryItems.forEach((item) => {
      totalCost = totalCost + item.cost;
    });

    const formattedTotalCost = totalCost.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN", // Change to Nigerian Naira
      minimumFractionDigits: 2, // Adjust for desired decimal places
    });

    return formattedTotalCost;
  };

  return (
    <View className="mt-5">
      <Text className="font-[outfit-bold] text-[25px] mb-4">Latest Budget</Text>
      <View>
        {props.categoryList?.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onCategoryClick(category)}
            className="flex flex-row gap-[10px] items-center bg-white p-[10px] rounded-[15px] shadow-sm mb-4"
          >
            <View className="justify-center items-baseline">
              <Text
                className="text-[35px] p-[16px] font-[outfit-medium] overflow-hidden"
                style={{
                  borderRadius: 16,
                  backgroundColor: category.color,
                }}
              >
                {category.icon}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between w-[70%]">
              <View>
                <Text className="font-[outfit-bold] text-xl ">
                  {category.name}
                </Text>
                <Text className="font-[outfit]">
                  {category?.CategoryItems?.length} Items
                </Text>
              </View>
              <Text className="font-[outfit-bold] text-[17px]">
                {calculateTotalCost(category?.CategoryItems)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
