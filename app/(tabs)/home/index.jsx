import React, { useEffect, useState } from "react";
import { ScrollView, Image, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants/images";
import CarouselComponent from "../../../components/CarouselComponent";
import HorizontalList from "../../../components/HorizontalList";
import SearchInput from "../../../components/SearchInput";
import {
  getAllCategories,
  getAllProducts,
  getTopSellingProducts,
} from "../../../api";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const response = await getTopSellingProducts();
      setProducts(response.data.topProducts);
    };
    getProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <SafeAreaView className="flex-1">
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View className="p-4 my-6">
          {/* Search Input Component */}
          <SearchInput />

          {/* Carousel Component */}
          <CarouselComponent />

          {/* Horizontal Lists for various sections */}
          <HorizontalList
            title="Top Categories"
            data={categories}
            link="home/top-categories"
          />
          <HorizontalList
            title="Top Products"
            data={products}
            link="home/top-products"
          />

          {/* Advertisement Banner */}
          <Image
            source={images.ad}
            className="w-full h-40 mt-6 mb-6 rounded-lg"
          />

          <HorizontalList
            title="Deal of the Week"
            data={categories}
            link="home/top-products"
          />
          <HorizontalList title="Featured Items" data={categories} link="#" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
