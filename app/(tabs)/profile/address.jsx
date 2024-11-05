import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getUserAddress } from "../../../api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const Address = () => {
  const [address, setAddress] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = () => {
    router.push("/(modal)/add-new-address");
  };

  useEffect(() => {
    const getAddress = async () => {
      const response = await getUserAddress();
      const defaultItem = response.data.find((item) => item.isDefault);
      if (defaultItem) {
        setSelectedItem(defaultItem._id);
      }
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
          <TouchableOpacity
            onPress={openModal}
            className="flex-row items-center"
          >
            <MaterialIcons
              name="add-circle-outline"
              size={24}
              color="#55AB60"
            />
            <Text className="ml-2 text-primary text-lg font-medium">
              Add new Address
            </Text>
          </TouchableOpacity>
          {/**address radio button */}
          <FlatList
            data={address}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => setSelectedItem(item._id)}
              >
                <View className="flex-row mt-4 items-center">
                  <View className="h-6 w-6 rounded-full border border-black flex justify-center items-center">
                    {selectedItem == item._id && (
                      <View className="h-4 w-4 rounded-full bg-primary"></View>
                    )}
                  </View>
                  <View className="w-72 h-28 ml-2 rounded-xl shadow-xl p-4 bg-white">
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <MaterialCommunityIcons
                          name="office-building-outline"
                          size={24}
                          color="black"
                        />
                        <Text className="font-semibold font-montserrat text-xl ml-2">
                          Office
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <MaterialIcons
                          name="mode-edit-outline"
                          size={24}
                          color="black"
                        />
                        <MaterialIcons name="delete" size={24} color="black" />
                      </View>
                    </View>
                    <Text>{item.fullName}</Text>
                    <Text>
                      {`${item.addressLine1}, ${item.addressLine2}, ${item.city}`}
                    </Text>
                    <Text>{item.phoneNumber}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Address;
