import { View, Text } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

const RadioCard = ({ item, selectedItem, setSelectedItem }) => {
  const {
    fullName,
    addressLine1,
    addressLine2,
    city,
    phoneNumber,
    _id,
    isDefault,
  } = item;
  return (
    <TouchableOpacity onPress={() => setSelectedItem(_id)}>
      <View className="flex-row mt-4 items-center">
        <View className="h-6 w-6 rounded-full border border-black flex justify-center items-center">
          {selectedItem == item._id && (
            <View className="h-4 w-4 rounded-full bg-primary"></View>
          )}
        </View>
        <View className="w-72 h-28 ml-2 rounded-xl  p-4 bg-white shadow-xl">
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
              <MaterialIcons name="mode-edit-outline" size={24} color="black" />
              <MaterialIcons name="delete" size={24} color="black" />
            </View>
          </View>
          <Text>{fullName}</Text>
          <Text>{`${addressLine1}, ${addressLine2}, ${city}`}</Text>
          <Text>{phoneNumber}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RadioCard;
