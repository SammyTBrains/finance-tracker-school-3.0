import { View, Text } from "react-native";

type CategoryListProps = {
  categoryList: any[] | null;
};

export default function CategoryList(props: CategoryListProps) {
  return (
    <View className="mt-5">
      <Text className="font-[outfit-bold] text-xl">Latest Budget</Text>
      <View>
        {props.categoryList?.map((category, index) => (
          <View key={index}>
            <View className="justify-center items-baseline">
              <Text
                className="text-[25px] p-[15px] font-[outfit-medium] overflow-hidden"
                style={{
                  borderRadius: 16,
                  backgroundColor: category.color,
                }}
              >
                {category.icon}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
