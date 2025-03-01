import { KindeSDK } from "@kinde-oss/react-native-sdk-0-7x";

// utils/KindeConfig.tsx
import { YOUR_KINDE_CLIENT_ID } from "../env";

export const client = new KindeSDK(
  "https://elohiminnovations.kinde.com",
  "exp://192.168.242.222:8081",
  YOUR_KINDE_CLIENT_ID,
  "exp://192.168.242.222:8081"
);
