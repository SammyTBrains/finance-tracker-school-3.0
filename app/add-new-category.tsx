import colors from "@/components/myApp/colors";
import ColorPicker from "@/components/myApp/ColorPicker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { supabase } from "@/utils/supabase";
import services from "@/utils/services";
import { useRouter } from "expo-router";

const AddNewCategory = () => {
  const router = useRouter();

  const [selectedIcon, setSelectedIcon] = useState("IC");
  const [selectedColor, setSelectedColor] = useState(colors.primary);
  const [categoryName, setCategoryName] = useState<string>();
  const [totalBudget, setTotalBudget] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const onCreateCategory = async () => {
    setIsLoading(true);
    const email = (await services.getData("userEmail")) || "";
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
      router.replace({
        pathname: "/category-details",
        params: { categoryId: data[0].id },
      });
      // Alert.alert("Category created successfully!");
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.colorPickerContainer}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={setSelectedIcon}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="local-offer" size={24} color="grey" />
        <TextInput
          placeholder="Category Name"
          placeholderTextColor="grey"
          onChangeText={setCategoryName}
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.createButton,
          (!categoryName || !totalBudget) && styles.disabledButton,
        ]}
        onPress={onCreateCategory}
        disabled={!categoryName || !totalBudget || isLoading}
      >
        <View style={styles.buttonContent}>
          {isLoading ? (
            <ActivityIndicator color="white" size="large" />
          ) : (
            <Text style={styles.buttonText}>Create</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddNewCategory;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
  },
  colorPickerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconInput: {
    textAlign: "center",
    fontSize: 24,
    padding: 20,
    borderRadius: 100,
    paddingHorizontal: 28,
    color: "white",
    fontFamily: "outfit-medium",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 5,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    padding: 14,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    width: "100%",
    fontSize: 17,
    fontFamily: "outfit",
  },
  createButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "outfit-bold",
    fontSize: 16,
  },
});
