import { View, Text, FlatList } from "react-native";
import React from "react";
import { Link } from "expo-router";
import ExploreProductCard from "./ExploreProductCard";

const HorizontalView = ({ title, link = "", data }) => {
  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between mb-2 px-4">
        <Text className="text-lg font-semibold">{title}</Text>
        <Link href={link} className="text-base font-bold text-primary">
          See all
        </Link>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <ExploreProductCard item={item} />}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default HorizontalView;
