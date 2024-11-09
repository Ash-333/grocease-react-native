import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { getAProductById } from "../../../../api";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../../../../components/CustomButton";
import { StatusBar } from "expo-status-bar";

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
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary h-48 rounded-b-2xl">
        <View className="flex-row items-center p-2">
          <TouchableOpacity>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-xl ml-3">Details</Text>
        </View>
      </View>

      {/* Centered Image */}
      <View className="items-center mt-[-90px]">
        <Image
          source={{ uri: product.image }}
          className="w-64 h-64"
          resizeMode="contain"
        />
      </View>

      {/* Left-Aligned Text Below Image */}
      <View className="px-4 mt-4 flex-row  justify-between items-center">
        <View>
          <Text className="text-2xl font-semibold font-montserrat">
            {product.name}
          </Text>
          <Text className="text-lg text-gray-600 mt-1 font-montserrat">{`Rs ${product.price}`}</Text>
        </View>
        <CustomButton
          containerStyles={"h-12 bg-transparent border border-primary w-32"}
          title={"Add to Cart"}
          textStyle={"text-primary font-semibold"}
        />
      </View>
      <View className="px-4 mt-8">
        <Text className="text-xl font-semibold font-montserrat mb-2">
          Description
        </Text>
        <Text className="text-base font-montserrat text-subheading">
          {product.description}
        </Text>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default ProductDetail;
