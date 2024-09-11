import { Image, StyleSheet, Text, View } from "react-native";

const loginBg = require("./../assets/images/myApp/loginBg.jpeg");

const LoginScreen = () => {
  return (
    <View className="flex items-center">
      <Image source={loginBg} className="h-[400px]" />
      <View className="bg-[#7a83e6] w-full h-full p-5 -m-[30px] rounded-tl-[20px] rounded-tr-[20px]">
        <Text>Personal Finance and Budget Planner</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
