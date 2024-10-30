import { View, Text, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
const ExploreProductCard = ({ item }) => {
  const goToDetailPage = () => {
    router.push(`/home/top-products/${item._id}`);
  };
  return (
    <TouchableOpacity
      onPress={goToDetailPage}
      className="h-44 w-32 bg-cardbg rounded-lg p-2 mr-4"
    >
      <Image
        source={{ uri: item.image }}
        className="h-3/5 w-full rounded-lg"
        resizeMode="contain"
      />
      <Text
        className="text-lg font-montserrat text-heading mt-2"
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="font-bold text-base">{`$ ${item.price}`}</Text>
        </View>
        <TouchableOpacity className="bg-primary rounded-full">
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </TouchableOpacity>
  );
};

export default ExploreProductCard;
