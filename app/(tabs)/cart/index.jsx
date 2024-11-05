import React, { useState, useCallback, useEffect } from "react";
import { View, Text, FlatList, Image } from "react-native";
import {
  getCartItems,
  updateCartItem,
  removeFromCart,
} from "../../../db/index.js";
import { router, useFocusEffect } from "expo-router";
import CartItem from "../../../components/CartItem.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants/images.js";
import CustomButton from "../../../components/CustomButton.jsx";
import { StatusBar } from "expo-status-bar";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalMRP, setTotalMRP] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  let total = 0;

  useFocusEffect(
    useCallback(() => {
      const loadCartItems = async () => {
        const items = await getCartItems();
        setCartItems(items);
      };
      loadCartItems();
    }, [])
  );

  const increaseQuantity = async (item) => {
    await updateCartItem(item.productId, item.quantity + 1);
    refreshCartItems();
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity > 1) {
      await updateCartItem(item.productId, item.quantity - 1);
    } else {
      await removeFromCart(item.productId);
    }
    refreshCartItems();
  };

  const deleteItemFromCart = async (id) => {
    await removeFromCart(id);
    refreshCartItems();
  };

  const refreshCartItems = async () => {
    const updatedItems = await getCartItems();
    setCartItems(updatedItems);
  };

  useEffect(() => {
    const calculateTotals = () => {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const discount = total * 0.1;
      const totalAfterDiscount = total - discount;
      const shipping = totalAfterDiscount > 100 ? 0 : 50;

      setTotalMRP(total);
      setDiscountedTotal(totalAfterDiscount);
      setShippingCharges(shipping);
    };

    calculateTotals();
  }, [cartItems]);

  const handleCheckout = () => {
    total = discountedTotal + shippingCharges;
    router.push({
      pathname: "/cart/checkout",
      params: {
        cartItems: JSON.stringify(cartItems),
        total: total,
      },
    });
  };

  // Render empty cart view
  const renderEmptyCart = () => (
    <View className="flex-1 items-center justify-center mt-4">
      <Text className="text-lg text-gray-500">Your cart is empty!</Text>
      <Text className="text-gray-400 mt-2">Add items to get started.</Text>
      <Image source={images.emptyCart} className="w-full h-96 mt-4" />
    </View>
  );

  // Render footer with totals and checkout button
  const renderFooter = () => (
    <>
      <View className="bg-white w-full rounded-lg shadow-lg mt-4">
        <View className="flex-row items-center justify-between p-2 border-b border-subheading">
          <Text className="text-base text-heading">Total MRP</Text>
          <Text className="text-base">{`Rs ${totalMRP.toFixed(2)}`}</Text>
        </View>
        <View className="flex-row items-center justify-between p-2 border-b border-subheading">
          <Text className="text-base text-heading">Discount</Text>
          <Text className="text-base">{`- Rs ${(totalMRP * 0.1).toFixed(
            2
          )}`}</Text>
        </View>
        <View className="flex-row items-center justify-between p-2 border-b border-subheading">
          <Text className="text-base text-heading">Shipping Charges</Text>
          <Text className="text-base">
            {shippingCharges === 0 ? "Free" : `Rs ${shippingCharges}`}
          </Text>
        </View>
        <View className="flex-row items-center justify-between p-2 bg-[#DCFFE2] rounded-b-lg">
          <Text className="text-base font-bold">Total</Text>
          <Text className="text-base font-bold">{`Rs ${(
            discountedTotal + shippingCharges
          ).toFixed(2)}`}</Text>
        </View>
      </View>
      <CustomButton
        containerStyles={"w-full h-12 mt-6"}
        title={"Checkout"}
        textStyle={"text-white"}
        handlePress={handleCheckout}
      />
    </>
  );

  return (
    <SafeAreaView className="p-4">
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            increase={() => increaseQuantity(item)}
            decrease={() => decreaseQuantity(item)}
            deleteItem={() => deleteItemFromCart(item.productId)}
          />
        )}
        ListHeaderComponent={
          <Text className="text-2xl font-semibold mb-4">Cart</Text>
        }
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyCart}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
