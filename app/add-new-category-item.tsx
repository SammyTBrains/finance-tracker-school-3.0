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
    const { data, error } = await supabase.storage
      .from("images")
      .upload(uniqueFileName + ".png", decode(image), {
        contentType: "image/png",
      });

    if (data) {
      const fileURL =
        "https://fwarxrodmopupvdhcino.supabase.co/storage/v1/object/public/images/" +
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
      router.replace({
        pathname: "/category-details",
        params: { categoryId: categoryId },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="p-5 bg-white">
          <View className="items-baseline">
            <TouchableOpacity onPress={() => onImagePicker()}>
              <Image
                source={{ uri: previewImage }}
                className="w-[150px] h-[150px] rounded-2xl bg-grey"
              />
            </TouchableOpacity>
          </View>
          <View className="p-3 border flex flex-row gap-[5px] items-center rounded-xl border-greyDarker mt-3 ">
            <Ionicons name="pricetag" size={24} color={colors.greyDarker} />
            <TextInput
              placeholder="Item name"
              placeholderTextColor={colors.greyDarker}
              onChangeText={(value) => setName(value)}
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
              keyboardType="numeric"
              onChangeText={(value) => setCost(value)}
              className="font-[outfit] text-[17px] w-[85%] h-full"
            />
          </View>
          <View className="p-3 border flex flex-row gap-[5px] items-center rounded-xl border-greyDarker mt-3">
            <Ionicons name="link" size={24} color={colors.greyDarker} />
            <TextInput
              placeholder="Url"
              placeholderTextColor={colors.greyDarker}
              onChangeText={(value) => setUrl(value)}
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
              onChangeText={(value) => setNote(value)}
              className="font-[outfit] text-[17px] w-[85%] h-full"
            />
          </View>
          <TouchableOpacity
            disabled={!name || !cost}
            className="bg-primary p-4 rounded-full mt-6"
            onPress={() => onClickAdd()}
          >
            <View className="items-center justify-center">
              {isLoading ? (
                <ActivityIndicator color="white" size={"large"} />
              ) : (
                <Text className="text-center font-[outfit-bold] text-white">
                  Add
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
