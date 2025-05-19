import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import colors from "@/components/myApp/colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import { useLocalSearchParams, useRouter } from "expo-router";

const placeholder =
  "https://th.bing.com/th/id/OIP.ECtovMmRXEdjb6kmGNUkUQAAAA?rs=1&pid=ImgDetMain";

export default function AddNewCatrgoryItem() {
  const router = useRouter();

  const [image, setImage] = useState(placeholder);
  const [previewImage, setPreviewImage] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryId } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [cost, setCost] = useState("");
  const [note, setNote] = useState("");

  const onImagePicker = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64!);
    }
  };

  const onClickAdd = async () => {
    setIsLoading(true);
    const uniqueFileName = Date.now();

    // Upload image to storage
    const { data, error } = await supabase.storage
      .from("images")
      .upload(uniqueFileName + ".png", decode(image), {
        contentType: "image/png",
      });

    if (error) {
      console.log("THE ERROR", error);
    } else {
      console.log("Upload successful:", data);
    }

    if (data) {
      const fileURL =
        "https://lxmtsutndsakztpwpmxn.supabase.co/storage/v1/object/public/images/" +
        uniqueFileName +
        ".png";

      const { data: CategoryItem, error } = await supabase
        .from("CategoryItems")
        .insert({
          name,
          cost,
          url,
          image: fileURL,
          note,
          category_id: categoryId,
        })
        .select();

      setIsLoading(false);
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoiding}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={onImagePicker}>
              <Image source={{ uri: previewImage }} style={styles.image} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="pricetag" size={24} color={colors.greyDarker} />
            <TextInput
              placeholder="Item name"
              placeholderTextColor={colors.greyDarker}
              onChangeText={setName}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome6
              name="naira-sign"
              size={24}
              color={colors.greyDarker}
            />
            <TextInput
              placeholder="Cost"
              placeholderTextColor={colors.greyDarker}
              keyboardType="numeric"
              onChangeText={(value) => setCost(value)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="link" size={24} color={colors.greyDarker} />
            <TextInput
              placeholder="Url"
              placeholderTextColor={colors.greyDarker}
              onChangeText={(value) => setUrl(value)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="pencil" size={24} color={colors.greyDarker} />
            <TextInput
              placeholder="Note"
              placeholderTextColor={colors.greyDarker}
              numberOfLines={3}
              multiline={true}
              onChangeText={(value) => setNote(value)}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.addButton,
              (!name || !cost) && styles.disabledButton,
            ]}
            onPress={onClickAdd}
            disabled={!name || !cost || isLoading}
          >
            <View style={styles.buttonContent}>
              {isLoading ? (
                <ActivityIndicator color="white" size="large" />
              ) : (
                <Text style={styles.buttonText}>Add</Text>
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "flex-start",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 16,
    backgroundColor: colors.grey,
  },
  inputContainer: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.greyDarker,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 12,
  },
  input: {
    fontFamily: "outfit",
    fontSize: 17,
    width: "85%",
    height: "100%",
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 100,
    marginTop: 24,
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
  },
});
