import React, { memo } from "react";
import { View, Text, FlatList } from "react-native";
import CategoryCard from "./CategoryCard";
import { Link } from "expo-router";

const HorizontalList = memo(({ title, data, link }) => (
  <View className="mt-6">
    <View className="flex-row justify-between mb-2 px-4">
      <Text className="text-lg font-semibold">{title}</Text>
      <Link href={link} className="text-lg text-primary">
        Explore All
      </Link>
    </View>
    <FlatList
      data={data}
      renderItem={(item) => <CategoryCard item={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  </View>
));

export default HorizontalList;
