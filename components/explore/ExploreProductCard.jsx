import { View, Text, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const ExploreProductCard = ({ item }) => {
  return (
    <View className="h-44 w-32 bg-cardbg rounded-lg p-2 mr-4">
      <Image source={{ uri: item.image }} className="h-3/5 w-full rounded-lg" />
      <Text className="text-lg font-light text-heading">{item.name}</Text>
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-subheading">{`${item.quantity} g`}</Text>
          <Text className="font-bold text-base">{`$ ${item.price}`}</Text>
        </View>
        <View className="bg-primary rounded-full">
          <MaterialIcons name="add" size={24} color="white" />
        </View>
      </View>
    </View>
  );
};

export default ExploreProductCard;
