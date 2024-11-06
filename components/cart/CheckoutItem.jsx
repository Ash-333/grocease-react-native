import { View, Text, Image } from "react-native";
import React from "react";

const CheckoutItem = ({ item }) => {
  return (
    <View className="p-4 w-full h-20 flex-row items-center mb-2 drop-shadow-lg bg-white rounded-lg">
      <Image
        source={{ uri: item.image }}
        className="w-12 h-full rounded-md"
        resizeMode="contain"
      />
      <View className="flex-row justify-between items-center ml-4 flex-1">
        <View>
          <Text className="text-xl">{item.name}</Text>
          <Text className="text-base font-montserrat">{`Rs ${item.price}`}</Text>
        </View>
        <Text className="text-lg font-bold font-montserrat">{`X${item.quantity}`}</Text>
      </View>
    </View>
  );
};

export default CheckoutItem;
