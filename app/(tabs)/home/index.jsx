import React, { useEffect, useState } from "react";
import { ScrollView, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants/images";
import CarouselComponent from "../../../components/CarouselComponent";
import HorizontalList from "../../../components/HorizontalList";
import SearchInput from "../../../components/SearchInput";
import { getAllCategories } from "../../../api";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await getAllCategories();
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <ScrollView nestedScrollEnabled>
        <View className="px-4 my-6">
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
            data={categories}
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
