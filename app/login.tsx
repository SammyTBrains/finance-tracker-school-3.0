import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import colors from "@/components/myApp/colors";
import services from "@/utils/services";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const loginBg = require("./../assets/images/myApp/bgmobileapp3.jpg");

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const insets = useSafeAreaInsets();
  const keyboardOffset = (Platform.OS === "ios" ? insets.top : 0) + 80;

  const handleLogin = async () => {
    if (!email.trim()) return; // Simple validation

    // Store both login state and email
    await Promise.all([
      services.storeData("login", "true"),
      services.storeData("userEmail", email.trim()),
    ]);

    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardOffset}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <Image source={loginBg} style={styles.backgroundImage} />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>
                Personal Finance and Budget Planner
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.greyDarker}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                blurOnSubmit
              />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={!email.trim()}
              >
                <Text style={styles.loginButtonText}>Continue</Text>
              </TouchableOpacity>

              <Text style={styles.footerText}>
                Start your journey to financial stability
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    height: 400,
    width: "100%",
  },
  contentContainer: {
    backgroundColor: colors.primary,
    width: "100%",
    flex: 1,
    padding: 20,
    marginTop: -30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 35,
    fontFamily: "outfit-bold",
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 40,
    fontFamily: "outfit",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    opacity: 1,
  },
  loginButtonText: {
    color: "white",
    fontFamily: "outfit-bold",
    textAlign: "center",
    fontSize: 16,
  },
  footerText: {
    fontSize: 13,
    color: colors.grey,
    marginTop: 20,
    textAlign: "center",
    fontFamily: "outfit",
  },
});

export default LoginScreen;
