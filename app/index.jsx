import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        if (token) {
          // If token exists, navigate to the home screen
          router.replace("/home");
        }
      } catch (error) {
        console.error("Error checking auth token:", error);
      }
    };

    checkAuthToken();
  }, []);
  return (
    <SafeAreaView>
      <Text className="text-green-500 font-bold">Hello world!</Text>
      <View className="flex-row">
        <CustomButton
          title={"Click me"}
          handlePress={() => router.replace("/sign-in")}
          containerStyles="w-full mt-7"
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
