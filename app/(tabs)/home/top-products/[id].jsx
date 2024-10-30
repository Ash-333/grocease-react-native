import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getAProductById } from "../../../../api";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getAProductById(id);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primary h-48 rounded-b-2xl relative">
        <View className="flex-row items-center p-2">
          <TouchableOpacity>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-bold font-montserrat text-xl ml-3">
            Details
          </Text>
        </View>
      </View>
      <Image
        source={{ uri: product.image }}
        className="w-64 h-64 absolute mt-28"
        resizeMethod="contain"
      />

      <Text>{product.name}</Text>
    </SafeAreaView>
  );
};

export default ProductDetail;
