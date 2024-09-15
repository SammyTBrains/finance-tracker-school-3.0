import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { supabase } from "@/utils/supabase";
import { client } from "@/utils/KindeConfig";
import { UserProfile } from "@kinde-oss/react-native-sdk-0-7x";
import services from "@/utils/services";
import { router, useFocusEffect } from "expo-router";
import colors from "@/components/myApp/colors";
import { CategoryData, CategoryItem } from "@/utils/types";

const Profile = () => {
  const [user, setUser] = useState<UserProfile>();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const [totalCategoryItems, setTotalCategoryItems] = useState(0);

  // useEffect(() => {
  //   getData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const firstNameModified = `${user?.given_name
    .charAt(0)
    .toUpperCase()}${user?.given_name.slice(1)}`;
  const lastNameModified = `${user?.family_name
    .charAt(0)
    .toUpperCase()}${user?.family_name.slice(1)}`;

  const getData = async () => {
    setIsLoading(true);
    const user = await client.getUserDetails();
    let { data: Category, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("created_by", user.email);

    let totalCategoryItems = 0;
    const GottenCategory = Category as CategoryData[];
    GottenCategory?.forEach((item, index) => {
      totalCategoryItems += item.CategoryItems.length;
    });

    setTotalCategoryItems(totalCategoryItems);
    setUser(user);
    setCategoryList(GottenCategory as CategoryData[]);
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    const loggedOut = await client.logout();
    if (loggedOut) {
      // User was logged out
      await services.storeData("login", "false");
      setIsLoading(false);
      router.replace("/login");
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 justify-center items-center gap-4">
      <View className="flex flex-row items-center justify-center gap-2">
        <Image
          source={{ uri: user?.picture }}
          className="w-[80px] h-[80px] rounded-full"
        />
        <Text className="text-xl font-[outfit-bold] ">{`${firstNameModified} ${lastNameModified}`}</Text>
      </View>
      <View className="mt-5 bg-white p-5 rounded-2xl shadow-sm">
        <Text className="font-[outfit-bold] text-xl">
          Email: <Text className="font-[outfit]">{user?.email}</Text>
        </Text>
        <Text className="font-[outfit-bold] text-xl">
          Categories:{" "}
          <Text className="font-[outfit]">{categoryList.length}</Text>
        </Text>
        <Text className="font-[outfit-bold] text-xl">
          Total Items:{" "}
          <Text className="font-[outfit]">{totalCategoryItems}</Text>
        </Text>
      </View>
      <TouchableOpacity
        className="bg-primary p-[15px] rounded-[10px]"
        onPress={handleLogout}
      >
        <View className="items-center justify-center">
          {isLoading ? (
            <ActivityIndicator color="white" size={"small"} />
          ) : (
            <Text className="text-white font-[outfit-bold] text-center text-base ">
              Logout
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
