import { Image, Text, TouchableOpacity, View } from "react-native";

const loginBg = require("./../assets/images/myApp/bgmobileapp3.jpg");

const LoginScreen = () => {
  return (
    <View className="flex items-center">
      <Image source={loginBg} className="h-[400px] w-full" />
      <View className="bg-primary w-full h-full p-5 -m-[30px] rounded-tl-[20px] rounded-tr-[20px]">
        <Text className="text-[35px] font-bold text-center text-white">
          Personal Finance and Budget Planner
        </Text>
        <Text className="text-[18px] text-center text-white mt-5">
          Stay on Track, Event by Event: The Best Way to Manage Your Finances
        </Text>

        <TouchableOpacity className="bg-white p-5 px-[5px] rounded-full mt-[30px]">
          <Text className="text-center text-primary">Login/Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
