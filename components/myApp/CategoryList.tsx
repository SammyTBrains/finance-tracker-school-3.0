import { CategoryItem } from "@/utils/types";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.title}>Latest Budget</Text>
      <View>
        {props.categoryList?.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onCategoryClick(category)}
            style={styles.categoryItem}
          >
            <View style={styles.iconContainer}>
              <Text
                style={[
                  styles.categoryIcon,
                  { backgroundColor: category.color },
                ]}
              >
                {category.icon}
              </Text>
            </View>
            <View style={styles.categoryInfo}>
              <View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.itemCount}>
                  {category.CategoryItems?.length} Items
                </Text>
              </View>
              <Text style={styles.categoryCost}>
                {calculateTotalCost(category.CategoryItems)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  categoryIcon: {
    fontSize: 35,
    padding: 16,
    borderRadius: 16,
    overflow: "hidden",
    fontFamily: "outfit-medium",
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
  categoryName: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  itemCount: {
    fontFamily: "outfit",
  },
  categoryCost: {
    fontFamily: "outfit-bold",
    fontSize: 17,
  },
});
