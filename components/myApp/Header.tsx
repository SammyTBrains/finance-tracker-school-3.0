import { client } from "@/utils/KindeConfig";
import { Ionicons } from "@expo/vector-icons";
import { UserProfile } from "@kinde-oss/react-native-sdk-0-7x";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

const Header = () => {
  const [user, setUser] = useState<UserProfile>();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };

  const modifiedName = `${user?.given_name
    .charAt(0)
    .toUpperCase()}${user?.given_name.slice(1)}`;

  return (
    <View className="flex flex-row items-center gap-2">
      <Image
        source={{ uri: user?.picture }}
        className="w-[50px] h-[50px] rounded-full"
      />
      <View className="flex flex-row items-center justify-between w-[85%]">
        <View>
          <Text className="text-white text-base">Welcome,</Text>
          <Text className="text-white text-xl font-bold">{modifiedName}</Text>
        </View>
        <Ionicons name="notifications" size={24} color={"white"} />
      </View>
    </View>
  );
};

export default Header;
