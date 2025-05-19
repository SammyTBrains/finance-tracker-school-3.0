import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { supabase } from "@/utils/supabase";
import { useKindeAuth } from "@kinde/expo";
import { getUserProfile } from "@kinde/expo/utils";
import { UserProfile } from "@kinde/expo/utils";
import services from "@/utils/services";
import { router, useFocusEffect } from "expo-router";
import colors from "@/components/myApp/colors";
import { CategoryData, CategoryItem } from "@/utils/types";

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>();
  const kinde = useKindeAuth();
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

  const firstNameModified = `${user?.givenName
    ?.charAt(0)
    .toUpperCase()}${user?.givenName?.slice(1)}`;
  const lastNameModified = `${user?.familyName
    ?.charAt(0)
    .toUpperCase()}${user?.familyName?.slice(1)}`;

  const getData = async () => {
    setIsLoading(true);
    const userProfile = await getUserProfile();
    console.log("User profile:", userProfile);
    let { data: Category, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("created_by", userProfile?.email);

    let totalCategoryItems = 0;
    const GottenCategory = Category as CategoryData[];
    GottenCategory?.forEach((item, index) => {
      totalCategoryItems += item.CategoryItems.length;
    });

    setTotalCategoryItems(totalCategoryItems);
    setUser(userProfile);
    setCategoryList(GottenCategory as CategoryData[]);
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    const loggedOut = await kinde.logout({ revokeToken: true });
    if (loggedOut) {
      // User was logged out
      await services.storeData("login", "false");
      setIsLoading(false);
      router.replace("/login");
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: user?.picture }} style={styles.profileImage} />
        <Text style={styles.profileName}>
          {`${firstNameModified} ${lastNameModified}`}
        </Text>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statHeading}>
          Email: <Text style={styles.statValue}>{user?.email}</Text>
        </Text>
        <Text style={styles.statHeading}>
          Categories:{" "}
          <Text style={styles.statValue}>{categoryList?.length}</Text>
        </Text>
        <Text style={styles.statHeading}>
          Total Items:{" "}
          <Text style={styles.statValue}>{totalCategoryItems}</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <View style={styles.buttonContent}>
          {isLoading ? (
            <ActivityIndicator color="white" size={"small"} />
          ) : (
            <Text style={styles.buttonText}>Logout</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#e0e3f9",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  statsContainer: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeading: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    marginBottom: 8,
  },
  statValue: {
    fontFamily: "outfit",
  },
  logoutButton: {
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
    fontSize: 16,
  },
});
