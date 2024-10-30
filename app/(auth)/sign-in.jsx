import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { icons } from "../../constants/icons";
import { loginUser } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    const { email, password } = form;

    if (!email || !password) {
      Alert.alert("Invalid input", "Please enter valid credentials");
    }
    try {
      const response = await loginUser({ email, password });
      const { user, token } = response.data;

      await AsyncStorage.setItem("jwtToken", token);
      await AsyncStorage.setItem("name", user.name);
      await AsyncStorage.setItem("userId", user._id);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Sign-in failed", error.message || "An error occured");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full flex justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-full h-[45px]"
          />
          <Image
            source={images.login}
            resizeMode="contain"
            className="w-full h-[150px] mt-8"
          />
          <Text className="text-2xl font-semibold text-green-600">Login</Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
            secureTextEntry={true}
          />

          <CustomButton
            title={"Sign In"}
            handlePress={handleSignIn}
            containerStyles="mt-7 bg-primary h-16"
            textStyle={"text-white"}
            // isLoading={isSubmittng}
          />

          {/* Line with 'Continue with' text */}
          <View className="flex-row items-center my-5">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="text-lg font-medium text-gray-500 mx-4">
              Continue with
            </Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          {/* Social login buttons */}
          <View className="flex-row justify-center gap-2">
            <CustomButton
              title={"Google"}
              containerStyles="flex-1 border border-primary bg-white h-12"
              imageSource={icons.google}
              imageStyle="w-8 h-8 mr-2"
            />
            <CustomButton
              title={"Facebook"}
              containerStyles="flex-1 border ml-3 border-primary bg-white h-12"
              imageSource={icons.facebook}
              imageStyle="w-8 h-8 mr-2"
            />
          </View>

          {/* Sign up link */}
          <View className="justify-center pt-3 flex-row gap-2">
            <Text className="text-lg font-normal">Don't have an account?</Text>
            <Link
              href={"/sign-up"}
              className="text-lg font-medium text-primary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
