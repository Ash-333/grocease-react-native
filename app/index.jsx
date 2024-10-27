import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

const App = () => {
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
