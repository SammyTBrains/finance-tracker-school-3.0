import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import PieChart from "react-native-pie-chart";

const CircularChart = () => {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState(["#e0e1e2"]);

  const amount = 0;

  const formattedAmount = amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN", // Change to Nigerian Naira
    minimumFractionDigits: 2, // Adjust for desired decimal places
  });

  return (
    <View className="mt-5 bg-white p-5 rounded-2xl shadow-sm">
      <Text className="text-xl">
        Total Estimate: <Text className="font-bold">{formattedAmount}</Text>
      </Text>
      <View className="mt-[10px] flex flex-row gap-10">
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={"#FFF"}
        />
        <View className="flex flex-row gap-[2px] items-center">
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={24}
            color={"#e0e1e2"}
          />
          <Text>NA</Text>
        </View>
      </View>
    </View>
  );
};

export default CircularChart;
