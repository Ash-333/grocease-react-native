import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllCategories, getAllProducts } from "../../../../api/index";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import TopProductsList from "../../../../components/explore/TopProductsList";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const TopProducts = () => {
  const [categories, setCategory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getAllCategories();

        setCategory(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleBack = () => {};
  return (
    <SafeAreaView>
      <ScrollView nestedScrollEnabled showsHorizontalScrollIndicator={false}>
        <View className="p-4 w-screen">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={handleBack}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={30}
                color="black"
              />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-center ml-4">
              Explore all products
            </Text>
          </View>
          {categories.map((category) => (
            <TopProductsList key={category._id} title={category.name} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopProducts;
