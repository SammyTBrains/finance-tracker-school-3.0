import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { supabase } from "@/utils/supabase";
import services from "@/utils/services";
import { router, useFocusEffect } from "expo-router";
import colors from "@/components/myApp/colors";
import { CategoryData, CategoryItem } from "@/utils/types";

const Profile = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    setIsLoading(true);

    try {
      // Get stored email
      const email = (await services.getData("userEmail")) || "";

      const { data: Category, error } = await supabase
        .from("Category")
        .select("*,CategoryItems(*)")
        .eq("created_by", email);

      let itemCount = 0;
      const categories = Category as CategoryData[];
      categories?.forEach((category) => {
        itemCount += category.CategoryItems.length;
      });

      setUserEmail(email);
      setCategoryList(categories || []);
      setTotalItems(itemCount);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        services.storeData("login", "false"),
        services.storeData("userEmail", ""),
      ]);
      router.replace("/login");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.emailText}>{userEmail}</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Categories: {categoryList.length}</Text>
        <Text style={styles.statText}>Total Items: {totalItems}</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.logoutText}>Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e0e3f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  emailText: {
    fontFamily: "outfit-bold",
    fontSize: 18,
    color: colors.primary,
  },
  statsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  statText: {
    fontFamily: "outfit",
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontFamily: "outfit-bold",
    fontSize: 16,
  },
});

export default Profile;
