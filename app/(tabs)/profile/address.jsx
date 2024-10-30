import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getUserAddress } from "../../../api";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

const Address = () => {
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const getAddress = async () => {
      const response = await getUserAddress();
      console.log(response.data);
      setAddress(response.data);
    };
    getAddress();
  }, []);
  return (
    <SafeAreaView>
      <View className="bg-primary">
        <Text className="text-xl font-semibold text-white p-4">
          My Addresses
        </Text>
        <View className="p-4 rounded-t-2xl mt-12 bg-white h-full">
          <TouchableOpacity className="flex-row items-center">
            <MaterialIcons
              name="add-circle-outline"
              size={24}
              color="#55AB60"
            />
            <Text className="ml-2 text-primary text-lg font-medium">
              Add new Address
            </Text>
          </TouchableOpacity>
          <FlatList data={address} renderItem={(item) => <Text>data</Text>} />
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Address;
