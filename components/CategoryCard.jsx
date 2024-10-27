import React, { memo } from "react";
import { View, Text, Image } from "react-native";

const CategoryCard = memo(({ item }) => (
  <View className="bg-secondary p-4 rounded-lg mr-4 w-32">
    <Image
      source={item.image}
      className="h-24 w-full rounded-lg"
      resizeMode="cover"
    />
    <Text className="text-center mt-2 text-sm font-semibold">{item.name}</Text>
  </View>
));

export default CategoryCard;
