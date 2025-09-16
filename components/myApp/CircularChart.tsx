import { CategoryData } from "@/utils/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";
import colors from "./colors";

type CircularChartProps = {
  categoryList: CategoryData[];
};

const CircularChart = (props: CircularChartProps) => {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState(["#e0e1e2"]);
  const [calculatedTotalCost, setCalculatedTotalCost] = useState("");

  useEffect(() => {
    props.categoryList && updateCircularChart();
  }, [props.categoryList]);

  const updateCircularChart = () => {
    let totalEstimates = 0;
    let sliceColorArray = [];
    let valuesArray = [];
    let otherCost = 0;
    props.categoryList.forEach((item, index) => {
      if (index < 4) {
        let itemTotalCost = 0;
        item.CategoryItems.forEach((item_2) => {
          itemTotalCost = itemTotalCost + item_2.cost;
          totalEstimates = totalEstimates + item_2.cost;
        });
        sliceColorArray.push(colors.COLOR_LIST[index]);
        valuesArray.push(itemTotalCost);
      } else {
        item.CategoryItems.forEach((item_2) => {
          otherCost = otherCost + item_2.cost;
          totalEstimates = totalEstimates + item_2.cost;
        });
      }
    });

    setCalculatedTotalCost(
      totalEstimates.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN", // Change to Nigerian Naira
        minimumFractionDigits: 2, // Adjust for desired decimal places
      })
    );

    // Only add the "Other" slice if it actually has a value
    if (otherCost > 0) {
      sliceColorArray.push(colors.COLOR_LIST[4]);
      valuesArray.push(otherCost);
    }

    const sum = valuesArray.reduce((a, b) => a + b, 0);
    if (sum <= 0) {
      // No data at all: show a neutral placeholder slice and keep arrays in sync
      setSliceColor([colors.grey]);
      setValues([1]);
      return;
    }

    setSliceColor(sliceColorArray);
    setValues(valuesArray);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Total Estimate:{" "}
        <Text style={styles.boldText}>{calculatedTotalCost}</Text>
      </Text>
      <View style={styles.chartContainer}>
        <PieChart
          widthAndHeight={150}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill="#FFF"
        />
        <View style={styles.legendContainer}>
          {props.categoryList?.length === 0 ? (
            <View style={styles.legendItem}>
              <MaterialCommunityIcons
                name="checkbox-blank-circle"
                size={24}
                color="#e0e1e2"
              />
              <Text style={styles.legendText}>NA</Text>
            </View>
          ) : (
            props.categoryList?.map(
              (category, index) =>
                index <= 4 && (
                  <View key={index} style={styles.legendItem}>
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle"
                      size={24}
                      color={colors.COLOR_LIST[index]}
                    />
                    <Text style={styles.legendText}>
                      {index < 4 ? category.name : "Other"}
                    </Text>
                  </View>
                )
            )
          )}
        </View>
      </View>
    </View>
  );
};

export default CircularChart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit",
  },
  boldText: {
    fontFamily: "outfit-bold",
  },
  chartContainer: {
    flexDirection: "row",
    gap: 40,
    marginTop: 14,
  },
  legendContainer: {
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    marginBottom: 8,
  },
  legendText: {
    fontFamily: "outfit",
    width: 80,
  },
});
