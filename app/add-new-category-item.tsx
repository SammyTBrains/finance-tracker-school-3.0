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
} from "react-native";
import React, { useState } from "react";
import colors from "@/components/myApp/colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const placeholder =
  "https://th.bing.com/th/id/OIP.ECtovMmRXEdjb6kmGNUkUQAAAA?rs=1&pid=ImgDetMain";

export default function AddNewCatrgoryItem() {
  const [image, setImage] = useState(placeholder);
  const [previewImage, setPreviewImage] = useState(placeholder);

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 p-5 ">
          <TouchableOpacity onPress={() => onImagePicker()}>
            <Image
              source={{ uri: previewImage }}
              className="w-[150px] h-[150px] rounded-2xl bg-grey"
            />
          </TouchableOpacity>
          <View className="p-3 border flex flex-row gap-[5px] items-center rounded-xl border-greyDarker mt-3 ">
            <Ionicons name="pricetag" size={24} color={colors.greyDarker} />
            <TextInput
              placeholder="Item name"
              placeholderTextColor={colors.greyDarker}
              className="font-[outfit] text-[17px] w-[85%] h-full"
            />
          </View>
          <View className="p-3 border flex flex-row gap-[5px] items-center rounded-xl border-greyDarker mt-3">
            <FontAwesome6
              name="naira-sign"
              size={24}
              color={colors.greyDarker}
            />
            <TextInput
              placeholder="Cost"
              placeholderTextColor={colors.greyDarker}
              className="font-[outfit] text-[17px] w-[85%] h-full"
            />
          </View>
          <View className="p-3 border flex flex-row gap-[5px] items-center rounded-xl border-greyDarker mt-3">
            <Ionicons name="link" size={24} color={colors.greyDarker} />
            <TextInput
              placeholder="Url"
              placeholderTextColor={colors.greyDarker}
              className="font-[outfit] text-[17px] w-[85%] h-full"
            />
          </View>
          <View className="p-3 border flex flex-row gap-[5px] items-center rounded-xl border-greyDarker mt-3">
            <Ionicons name="pencil" size={24} color={colors.greyDarker} />
            <TextInput
              placeholder="Note"
              placeholderTextColor={colors.greyDarker}
              numberOfLines={3}
              multiline={true}
              className="font-[outfit] text-[17px] w-[85%] h-full"
            />
          </View>
          <TouchableOpacity className="bg-primary p-4 rounded-full mt-6">
            <Text className="text-center font-[outfit-bold] text-white">
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
