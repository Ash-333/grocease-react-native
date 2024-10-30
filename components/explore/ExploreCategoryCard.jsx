import { Text, Image, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const ExploreCategoryCard = ({ item }) => {
  const handleClick = () => {
    router.push(`/home/top-categories/${item.name}`);
  };
  return (
    <TouchableOpacity
      onPress={handleClick}
      className="bg-secondary rounded-lg p-2 m-2 h-32 w-[98px]"
    >
      <Image
        source={{ uri: item.image }}
        className="h-20 w-full rounded-lg "
        resizeMode="contain"
      />
      <Text className="text-primary text-center text-sm mt-2 font-montserrat font-semibold">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ExploreCategoryCard;
