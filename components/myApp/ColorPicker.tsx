import { Text, View, TouchableOpacity } from "react-native";
import colors from "./colors";

type ColorPickerProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const ColorPicker = (props: ColorPickerProps) => {
  return (
    <View className="flex flex-row gap-5 mt-5">
      {colors.COLOR_LIST.map((color, index) => (
        <TouchableOpacity
          key={index}
          className="h-[30px] w-[30px] rounded-full"
          style={[
            { backgroundColor: color },
            color === props.selectedColor && { borderWidth: 4 },
          ]}
          onPress={() => props.setSelectedColor(color)}
        ></TouchableOpacity>
      ))}
    </View>
  );
};

export default ColorPicker;
