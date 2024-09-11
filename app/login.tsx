import { client } from "@/utils/KindeConfig";
import services from "@/utils/services";
import { useRouter } from "expo-router";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";

const loginBg = require("./../assets/images/myApp/bgmobileapp3.jpg");

const LoginScreen = () => {
  const router = useRouter();

  const handleSignUp = async () => {
    const token = await client.register();
    if (token) {
      // User was authenticated
      await services.storeData("login", "true");
      router.replace("/");
    }
  };

  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      // User was authenticated
      await services.storeData("login", "true");
      router.replace("/");
    }
  };

  return (
    <View className="flex items-center">
      <Image source={loginBg} className="h-[400px] w-full" />
      <View className="bg-primary w-full h-full p-5 -m-[30px] rounded-tl-[20px] rounded-tr-[20px]">
        <Text className="text-[35px] font-[outfit-bold] text-center text-white">
          Personal Finance and Budget Planner
        </Text>
        <Text className="text-[18px] text-center text-white mt-5 font-[outfit] ">
          Stay on Track, Event by Event: The Best Way to Manage Your Finances
        </Text>

        <TouchableOpacity
          className="bg-white p-5 px-[5px] rounded-full mt-[30px]"
          onPress={handleSignIn}
        >
          <Text className="text-center text-primary font-[outfit-bold] ">
            Login
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row justify-center items-center mt-3">
          <Text className="font-[outfit]">Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text className="text-secondary font-[outfit-bold] ">Signup</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-[13px] text-grey mt-[10px] text-center font-[outfit] ">
          Start your journey to financial statbiltiy
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
