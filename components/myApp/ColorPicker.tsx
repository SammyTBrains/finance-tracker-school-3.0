import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import colors from "./colors";

type ColorPickerProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const ColorPicker = (props: ColorPickerProps) => {
  return (
    <View style={styles.container}>
      {colors.COLOR_LIST.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.colorButton,
            { backgroundColor: color },
            color === props.selectedColor && styles.selectedButton,
          ]}
          onPress={() => props.setSelectedColor(color)}
        />
      ))}
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  colorButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  selectedButton: {
    borderWidth: 4,
    borderColor: "white",
  },
});
