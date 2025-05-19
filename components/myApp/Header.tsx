import services from "@/utils/services";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";

const Header = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = (await services.getData("userEmail")) || "";
    setUser(user);
  };

  const modifiedName = `${user}`;

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: user?.picture }} style={styles.profileImage} /> */}
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>{modifiedName}</Text>
        </View>
        {/* <Ionicons name="notifications" size={24} color="white" /> */}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  welcomeText: {
    color: "white",
    fontSize: 16,
    fontFamily: "outfit",
  },
  userName: {
    color: "white",
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
});
