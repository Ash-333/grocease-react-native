import { router } from "expo-router";
import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";

const CategoryCard = ({ item }) => {
  const handleClick = () => {
    router.push(`/home/top-categories/${item.name}`);
  };
  return (
    <TouchableOpacity
      onPress={handleClick}
      className="bg-secondary p-2 rounded-lg m-2 h-32 w-[96px]"
    >
      <Image
        source={{ uri: item.image }}
        className="h-20 w-full rounded-lg"
        resizeMode="contain"
      />
      <Text className="text-center mt-2 text-sm font-semibold">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
export default CategoryCard;
