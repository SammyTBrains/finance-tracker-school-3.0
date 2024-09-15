import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios from "axios";
import { client } from "@/utils/KindeConfig";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/components/myApp/colors";
import { OPENAI_API_KEY } from "@/env";

const AIAssistance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  const handleUserMessage = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "davinci-002",
          prompt: userMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center items-center p-5 bg-white">
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Text>Results to be shown here</Text>
            </View>
          </ScrollView>
          <View className="p-3 border flex flex-row items-center rounded-xl border-greyDarker">
            <View className="flex flex-row items-center gap-[5px]">
              <Ionicons name="pencil" size={24} color={colors.greyDarker} />
              <TextInput
                placeholder="Enter a message..."
                placeholderTextColor={colors.greyDarker}
                numberOfLines={3}
                multiline={true}
                onChangeText={(value) => setUserMessage(value)}
                className="font-[outfit] text-[17px] w-[70%] h-full"
              />
            </View>
            <TouchableOpacity
              className="bg-primary p-[15px] rounded-[10px]"
              onPress={() => {
                setIsLoading(true);
                setTimeout(handleUserMessage, 1000); // 1 second delay
              }}
            >
              <View className="items-center justify-center">
                {isLoading ? (
                  <ActivityIndicator color="white" size={"small"} />
                ) : (
                  <Text className="text-white font-[outfit-bold] text-center text-base ">
                    Send
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AIAssistance;
