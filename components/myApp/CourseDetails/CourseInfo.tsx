import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { CategoryData, CategoryItem } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
import { formatAmount } from "@/utils/functions";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import colors from "../colors";

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
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <Text
            style={[
              styles.iconText,
              { backgroundColor: props.categoryData.color },
            ]}
          >
            {props.categoryData.icon}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.categoryName}>{props.categoryData?.name}</Text>
          <Text style={styles.itemCount}>
            {props.categoryData?.CategoryItems.length} Items
          </Text>
        </View>
        <TouchableOpacity onPress={onDeleteCategory}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.totalCost}>{totalCost}</Text>
        <Text style={styles.budgetText}>
          Total Budget:{" "}
          {props.categoryData.assigned_budget.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN", // Change to Nigerian Naira
            minimumFractionDigits: 2, // Adjust for desired decimal places
          })}
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percentageTotal}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  iconText: {
    fontSize: 40,
    padding: 20,
    borderRadius: 15,
    overflow: "hidden",
    fontFamily: "outfit-medium",
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  categoryName: {
    fontFamily: "outfit-bold",
    fontSize: 24,
  },
  itemCount: {
    fontFamily: "outfit",
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  totalCost: {
    fontFamily: "outfit-bold",
  },
  budgetText: {
    fontFamily: "outfit",
  },
  progressBar: {
    width: "100%",
    height: 15,
    backgroundColor: colors.grey,
    borderRadius: 100,
    marginTop: 8,
  },
  progressFill: {
    backgroundColor: colors.primary,
    height: "100%",
    borderRadius: 100,
  },
});
