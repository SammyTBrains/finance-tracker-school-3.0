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
import { GOOGLE_API_KEY, OPENAI_API_KEY } from "@/env";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/utils/supabase";

const AIAssistance = () => {
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

  const [isLoading, setIsLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [aiResponse, setAIResponse] = useState("");

  const handleUserMessage = async () => {
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const { email } = await client.getUserDetails();
      let { data: Category, error } = await supabase
        .from("Category")
        .select("*,CategoryItems(*)")
        .eq("created_by", email)
        .order("created_at", { ascending: false });

      const chat = model.startChat({
        history: Category?.map((item) => ({
          role: "user",
          parts: [
            {
              text: JSON.stringify(item),
            },
          ],
        })),
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const result = await chat.sendMessage(
        userMessage + " Don't show your response in JSON or object format"
      );
      const response = result.response.text();
      console.log(response);
      setAIResponse(response);
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
              <Text>{aiResponse}</Text>
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
              onPress={handleUserMessage}
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
