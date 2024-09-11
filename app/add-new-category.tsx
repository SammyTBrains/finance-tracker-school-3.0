import colors from "@/components/myApp/colors";
import ColorPicker from "@/components/myApp/ColorPicker";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const AddNewCategory = () => {
  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColor, setSelectedColor] = useState(colors.primary);

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
          className="w-full text-base font-[outfit]"
        />
      </View>

      <View className="flex flex-row border gap-[5px] rounded-[10px] p-[14px] border-grey bg-white items-center mt-5">
        <FontAwesome6 name="naira-sign" size={24} color={"grey"} />
        <TextInput
          placeholder="Total Budget"
          placeholderTextColor={"grey"}
          className="w-full text-base font-[outfit]"
        />
      </View>
    </View>
  );
};

export default AddNewCategory;
