import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const Checkout = () => {
  const { cartItems, total } = useLocalSearchParams();
  const parsedCartItems = JSON.parse(cartItems);

  const items = parsedCartItems.map((item) => ({
    productId: item.productId, // Convert productId to ObjectId
    productName: item.name,
    productImg: item.image,
    quantity: item.quantity,
    price: item.price,
    category: item.category,
  }));

  console.log(items);
  return (
    <SafeAreaView>
      <Text>Checkout</Text>
    </SafeAreaView>
  );
};

export default Checkout;
