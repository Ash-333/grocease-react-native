import { View, Text } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomButton from "./CustomButton";
import { StatusBar } from "expo-status-bar";

const ProductCard = ({ item }) => {
  return (
    <View className="w-48 h-60 bg-cardbg rounded-lg px-2 py-3">
      <Image source={{ uri: item.image }} className="h-3/5 w-full rounded-lg" />
      <Text className="text-lg font-bold text-heading">
        {item.name} <Text className="text-base">{`(${item.quantity})`}</Text>
      </Text>
      <View>
        <Text>{`$${item.price}`}</Text>
        <View className="flex">
          <View className="bg-primary rounded-full">
            <MaterialIcons name="add" size={24} color="white" />
          </View>
          <Text>1</Text>
          <View className="bg-primary rounded-full">
            <MaterialIcons name="remove" size={24} color="white" />
          </View>
        </View>
      </View>
      <CustomButton title={"Add to cart"} containerStyles={"h-12"} />
    </View>
  );
};

export default ProductCard;
