import services from "@/utils/services";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const CheckAuth = () => {
  const router = useRouter();

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    const result = await services.getData("login");
    if (result !== "true") {
      router.replace("/login");
    } else {
      router.replace("/");
    }
  };
  return null;
};

export default CheckAuth;
