import React, { memo } from "react";
import { View, Text, FlatList } from "react-native";
import ExploreCategoryCard from "./explore/ExploreCategoryCard";
import { Link } from "expo-router";

const HorizontalList = ({ title, data, link }) => {
  return (
    <View className="mt-6">
      <View className="flex-row justify-between mb-2 ">
        <Text className="text-lg font-bold font-montserrat">{title}</Text>
        <Link href={link} className="text-base text-primary font-montserrat">
          Explore All
        </Link>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <ExploreCategoryCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HorizontalList;
