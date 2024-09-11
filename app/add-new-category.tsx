import colors from "@/components/myApp/colors";
import ColorPicker from "@/components/myApp/ColorPicker";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { supabase } from "@/utils/supabase";
import { client } from "@/utils/KindeConfig";

const AddNewCategory = () => {
  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColor, setSelectedColor] = useState(colors.primary);
  const [categoryName, setCategoryName] = useState<string>();
  const [totalBudget, setTotalBudget] = useState<string>();

  const onCreateCategory = async () => {
    const { email } = await client.getUserDetails();
    const { data, error } = await supabase
      .from("Category")
      .insert([
        {
          icon: selectedIcon,
          color: selectedColor,
          name: categoryName,
          assigned_budget: totalBudget,
          created_by: email,
        },
      ])
      .select();

    if (data) {
      Alert.alert("Category created successfully!");
    }
  };

  return (
    <View className="mt-5 p-5">
      <View className="justify-center items-center">
        <TextInput
          className="text-center text-3xl p-5 rounded-full px-7 text-white font-[outfit-medium]"
          style={{ backgroundColor: selectedColor }}
          maxLength={2}
          onChangeText={(value) => setSelectedIcon(value)}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>
      {/* Add category name and total budget section */}
      <View className="flex flex-row border gap-[5px] rounded-[10px] p-[14px] border-grey bg-white items-center mt-5">
        <MaterialIcons name="local-offer" size={24} color={"grey"} />
        <TextInput
          placeholder="Category Name"
          placeholderTextColor={"grey"}
          onChangeText={(value) => setCategoryName(value)}
          className="w-full text-[17px] font-[outfit]"
        />
      </View>

      <View className="flex flex-row border gap-[5px] rounded-[10px] p-[14px] border-grey bg-white items-center mt-5">
        <FontAwesome6 name="naira-sign" size={24} color={"grey"} />
        <TextInput
          placeholder="Total Budget"
          placeholderTextColor={"grey"}
          keyboardType="numeric"
          onChangeText={(value) => setTotalBudget(value)}
          className="w-full text-[17px] font-[outfit]"
        />
      </View>

      <TouchableOpacity
        className="bg-primary p-[15px] rounded-[10px] mt-[30px]"
        disabled={!categoryName || !totalBudget}
        onPress={() => onCreateCategory()}
      >
        <Text className="text-white font-[outfit-bold] text-center text-base">
          Create
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNewCategory;
