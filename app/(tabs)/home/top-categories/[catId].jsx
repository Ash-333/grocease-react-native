import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getAllProductsByCategory } from "../../../../api";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Card from "../../../../components/products/Card";
import { TouchableOpacity } from "react-native";

const CategoryProduct = () => {
  const { catId } = useLocalSearchParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await getAllProductsByCategory(catId);
      setProducts(response.data);
    };
    getProducts();
  }, [catId]);

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primary">
        <View className="flex-row items-center p-2">
          <TouchableOpacity onPress={handleBack}>
            <MaterialIcons name="keyboard-arrow-left" size={26} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-semibold text-xl ml-2">{catId}</Text>
        </View>
        <View className="bg-white rounded-t-2xl p-2 h-full mt-12">
          <FlatList
            className="mt-2"
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Card item={item} />}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>
      </View>
      <StatusBar translucent />
    </SafeAreaView>
  );
};

export default CategoryProduct;
