import colors from "@/components/myApp/colors";
import ColorPicker from "@/components/myApp/ColorPicker";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

const AddNewCategory = () => {
  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColor, setSelectedColor] = useState(colors.primary);

  return (
    <View className="mt-5 p-5">
      <View className="justify-center items-center">
        <TextInput
          className="text-center text-3xl p-5 rounded-full px-7 text-white"
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
    </View>
  );
};

export default AddNewCategory;
