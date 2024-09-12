import { CategoryData } from "@/utils/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
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

  const amount = 0;

  const formattedAmount = amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN", // Change to Nigerian Naira
    minimumFractionDigits: 2, // Adjust for desired decimal places
  });

  useEffect(() => {
    updateCircularChart();
  }, []);

  const updateCircularChart = () => {
    let totalEstimates = 0;
    setSliceColor([]);
    setValues([]);
    let otherCost = 0;
    props.categoryList.forEach((item, index) => {
      if (index < 4) {
        let itemTotalCost = 0;
        item.CategoryItems.forEach((item_2) => {
          itemTotalCost = itemTotalCost + item_2.cost;
          totalEstimates = totalEstimates + item_2.cost;
        });
        setSliceColor((sliceColor) => [
          ...sliceColor,
          colors.COLOR_LIST[index],
        ]);
        setValues((values) => [...values, itemTotalCost]);
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
    setSliceColor((sliceColor) => [...sliceColor, colors.COLOR_LIST[4]]);
    setValues((values) => [...values, otherCost]);
  };

  return (
    <View className="mt-5 bg-white p-5 rounded-2xl shadow-sm">
      <Text className="text-xl font-[outfit] ">
        Total Estimate:{" "}
        <Text className="font-[outfit-bold]">{calculatedTotalCost}</Text>
      </Text>
      <View className="flex flex-row gap-10 -mt-6">
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={"#FFF"}
        />
        {props.categoryList?.length === 0 ? (
          <View className="flex flex-row gap-[2px] items-center">
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={24}
              color={"#e0e1e2"}
            />
            <Text className="font-[outfit]">NA</Text>
          </View>
        ) : (
          <View>
            {props.categoryList?.map(
              (category, index) =>
                index <= 4 && (
                  <View
                    key={index}
                    className="flex flex-row gap-[2px] items-center"
                  >
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle"
                      size={24}
                      color={colors.COLOR_LIST[index]}
                    />
                    <Text className="font-[outfit]">
                      {index < 4 ? category.name : "Other"}
                    </Text>
                  </View>
                )
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default CircularChart;
