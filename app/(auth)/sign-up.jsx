import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants/images";
import { icons } from "../../constants/icons";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full flex justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-full h-[45px]"
          />
          <Text className="text-2xl font-semibold text-primary">Register</Text>

          <FormField
            title="Your Name"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-4"
            keyboardType="email"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
            secureTextEntry={true}
          />
          <FormField
            title="Confirm Password"
            value={form.password}
            otherStyles="mt-4"
            secureTextEntry={true}
          />
          <FormField
            title="Contact Number"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, contact: e })}
            otherStyles="mt-4"
            keyboardType="numeric"
          />

          <CustomButton
            title={"Register"}
            handlePress={"handleSignIn"}
            containerStyles="mt-7 bg-primary h-16"
            textStyle={"text-white"}
            // isLoading={isSubmittng}
          />

          {/* Line with 'Continue with' text */}
          <View className="flex-row items-center my-5">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="text-lg font-medium text-gray-500 mx-4">
              Or continue with
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
            <Text className="text-lg font-normal">
              Already have an account?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg font-medium text-primary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
