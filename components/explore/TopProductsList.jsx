import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import ExploreProductCard from "./ExploreProductCard";
import { getAllProducts, getAllProductsByCategory } from "../../api";

const TopProductsList = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getAllProductsByCategory(title);

        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);
  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between mb-2 px-4">
        <Text className="text-lg font-semibold">{title}</Text>
        <Link
          href={`/home/top-categories/${title}`}
          className="text-base font-bold text-primary"
        >
          See all
        </Link>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => <ExploreProductCard item={item} />}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default TopProductsList;
