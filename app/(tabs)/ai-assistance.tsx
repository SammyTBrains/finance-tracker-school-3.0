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
  StyleSheet,
} from "react-native";
import axios from "axios";
import { client } from "@/utils/KindeConfig";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/components/myApp/colors";
import { GOOGLE_API_KEY, OPENAI_API_KEY } from "../../env";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/utils/supabase";
import { GiftedChat } from "react-native-gifted-chat";

const AIAssistance = () => {
  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  type messageType = {
    _id: string;
    text: string;
    createdAt: Date;
    user: { _id: number };
  };

  const [messages, setMessages] = useState<messageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [aiResponse, setAIResponse] = useState("");

  const handleUserMessage = async () => {
    setIsLoading(true);

    const message = {
      _id: Math.random().toString(36).substring(7),
      text: userMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    setMessages((prevMessages) => GiftedChat.append(prevMessages, [message]));
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
          maxOutputTokens: 300,
        },
      });

      const result = await chat.sendMessage(
        userMessage + " \n Don't show your response in JSON or object format"
      );
      const response = result.response.text();
      const message = {
        _id: Math.random().toString(36).substring(7),
        text: response,
        createdAt: new Date(),
        user: { _id: 2, name: "AI Assistant" },
      };
      setMessages((prevMessages) => GiftedChat.append(prevMessages, [message]));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoiding}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.chatContainer}>
            <GiftedChat
              messages={messages}
              renderInputToolbar={() => null}
              user={{ _id: 1 }}
              minInputToolbarHeight={0}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="pencil" size={24} color={colors.greyDarker} />
              <TextInput
                placeholder="Enter a message..."
                placeholderTextColor={colors.greyDarker}
                numberOfLines={3}
                multiline={true}
                onChangeText={setUserMessage}
                style={styles.inputField}
              />
            </View>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleUserMessage}
            >
              <View style={styles.buttonContent}>
                {isLoading ? (
                  <ActivityIndicator color="white" size={"small"} />
                ) : (
                  <Text style={styles.buttonText}>Send</Text>
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

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e0e3f9",
  },
  chatContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.greyDarker,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 1,
  },
  inputField: {
    fontFamily: "outfit",
    fontSize: 17,
    width: "70%",
    height: "100%",
  },
  sendButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "outfit-bold",
    textAlign: "center",
    fontSize: 16,
  },
});
