import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../../../api/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import CategoryCard from "../../../../components/CategoryCard";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);
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

  const handleBack = () => {
    router.back();
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="p-4 w-screen">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={handleBack}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-center ">
            Explore all categories
          </Text>
        </View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <CategoryCard item={item} />}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
};

export default TopCategories;
