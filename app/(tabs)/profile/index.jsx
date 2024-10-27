import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Profile = () => {
  return (
    <SafeAreaView>
      <View className="p-4">
        <Text className="text-2xl font-semibold text-green-600">
          Hello, <Text className="text-black">Ashish</Text>
        </Text>

        <View className="bg-accent rounded-3xl mt-8 h-full">
          <Link className="p-4 border-b border-gray-300" href="profile/orders">
            <View className=" flex-row items-center">
              <MaterialIcons name="list-alt" size={26} color="#55AB60" />
              <Text className="text-lg ml-4">My order</Text>
            </View>
          </Link>
          <Link className="p-4 border-b border-gray-300" href="profile/address">
            <View className=" flex-row items-center">
              <MaterialIcons name="location-pin" size={26} color="#55AB60" />
              <Text className="text-lg ml-4">My Address</Text>
            </View>
          </Link>
          <Link className="p-4 border-b border-gray-300" href="profile/faq">
            <View className=" flex-row items-center">
              <MaterialIcons name="question-answer" size={26} color="#55AB60" />
              <Text className="text-lg ml-4">FAQ</Text>
            </View>
          </Link>
          <Link
            className="p-4 border-b border-gray-300"
            href="profile/contact-us"
          >
            <View className=" flex-row items-center">
              <MaterialIcons name="support-agent" size={26} color="#55AB60" />
              <Text className="text-lg ml-4">Contact Us</Text>
            </View>
          </Link>
          <Link
            className="p-4 border-b border-gray-300"
            href="profile/about-us"
          >
            <View className=" flex-row items-center">
              <MaterialIcons name="info-outline" size={26} color="#55AB60" />
              <Text className="text-lg ml-4">About Us</Text>
            </View>
          </Link>
          <Link className="p-4 border-b border-gray-300" href="#">
            <View className=" flex-row items-center">
              <MaterialIcons name="exit-to-app" size={26} color="#55AB60" />
              <Text className="text-lg ml-4">Log Out</Text>
            </View>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
