import colors from "@/components/myApp/colors";
import services from "@/utils/services";
import { useRouter } from "expo-router";
import { useKindeAuth } from "@kinde/expo";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const loginBg = require("./../assets/images/myApp/bgmobileapp3.jpg");

const LoginScreen = () => {
  const router = useRouter();
  const kinde = useKindeAuth();

  const handleSignUp = async () => {
    const token = await kinde.register({});
    if (token) {
      // User was authenticated
      await services.storeData("login", "true");
      router.replace("/");
    }
  };

  const handleSignIn = async () => {
    const token = await kinde.login({});
    if (token) {
      // User was authenticated
      await services.storeData("login", "true");
      router.replace("/");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={loginBg} style={styles.backgroundImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Personal Finance and Budget Planner</Text>
        <Text style={styles.subtitle}>
          Stay on Track, Event by Event: The Best Way to Manage Your Finances
        </Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signupLink}>Signup</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>
          Start your journey to financial stability
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  backgroundImage: {
    height: 400,
    width: "100%",
  },
  contentContainer: {
    backgroundColor: colors.primary,
    width: "100%",
    height: "100%",
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
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontFamily: "outfit",
  },
  loginButton: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 100,
    marginTop: 30,
  },
  loginButtonText: {
    color: colors.primary,
    fontFamily: "outfit-bold",
    textAlign: "center",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  signupText: {
    fontFamily: "outfit",
  },
  signupLink: {
    color: colors.secondary,
    fontFamily: "outfit-bold",
  },
  footerText: {
    fontSize: 13,
    color: colors.grey,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "outfit",
  },
});
