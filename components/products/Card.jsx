import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import CustomButton from "../CustomButton";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
const { width } = Dimensions.get("window");

const Card = ({ item }) => {
  const handleClick = () => {
    router.push(`/home/top-products/${item._id}`);
  };
  return (
    <TouchableOpacity
      onPress={handleClick}
      className="p-4 w-[160px] h-60 bg-cardbg rounded-lg m-2"
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-1/2"
        resizeMode="contain"
      />
      <Text className="text-xl font-semibold mt-1" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="text-primary text-lg ">RS {item.price}</Text>
      <CustomButton
        title="Add to Cart"
        containerStyles="bg-transparent border border-primary h-8 mt-3 rounded-lg"
        textStyle="font-semibold text-primary text-base"
      />
    </TouchableOpacity>
  );
};

export default Card;
