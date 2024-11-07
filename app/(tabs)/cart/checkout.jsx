import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import CheckoutItem from "../../../components/cart/CheckoutItem";
import { getUserAddress, placeOrder } from "../../../api";
import { TouchableOpacity } from "react-native";
import CustomButton from "../../../components/CustomButton";
import { clearCart } from "../../../db";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Checkout = () => {
  const { cartItems, total } = useLocalSearchParams();
  const [address, setAddress] = useState([]);
  const parsedCartItems = JSON.parse(cartItems);

  useEffect(() => {
    const getAddress = async () => {
      const response = await getUserAddress();
      const defaultItem = response.data.find((item) => item.isDefault);
      setAddress(defaultItem);
    };
    getAddress();
  }, []);

  const items = parsedCartItems.map((item) => ({
    productId: item.productId,
    productName: item.name,
    productImg: item.image,
    quantity: item.quantity,
    price: item.price,
    category: item.category,
  }));

  const handleChangeAddress = () => {
    router.push("/profile/address");
  };

  const handleCheckout = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const order = {
      userId: userId,
      items: items,
      total: total,
      shippingAddress: address,
    };

    try {
      const response = await placeOrder(order);
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        clearCart();
        router.replace("/cart");
      } else {
        Alert.alert("Order could not be placed. Please try again.");
      }
    } catch (error) {
      Alert.alert("Something went wrong");
    }
  };

  return (
    <SafeAreaView className="p-4 ">
      <Text className="text-xl font-bold mb-4">Order Summary</Text>
      <View className="w-full mb-4">
        <View className="flex-row items-center justify-between mb-2 ">
          <Text className="text-lg">Deliver to</Text>
          <TouchableOpacity onPress={handleChangeAddress}>
            <Text>Change</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-white rounded-lg drop-shadow-lg w-full p-4">
          <Text>{address.fullName}</Text>
          <Text>{address.phoneNumber}</Text>
          <Text>
            {`${address.addressLine1}, ${address.addressLine2}, ${address.city}`}
          </Text>
        </View>
      </View>
      <FlatList
        data={parsedCartItems}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={({ item }) => <CheckoutItem item={item} />}
      />
      <CustomButton
        containerStyles={"w-full h-12 mt-6"}
        title={"Place Order"}
        textStyle={"text-white"}
        handlePress={handleCheckout}
      />
    </SafeAreaView>
  );
};

export default Checkout;
