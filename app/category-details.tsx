import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function CategoryDetails() {
  const { categoryId } = useLocalSearchParams();

  useEffect(() => {
    // console.log(categoryId);
  }, [categoryId]);

  return (
    <View>
      <Text>CategoryDetails</Text>
    </View>
  );
}
