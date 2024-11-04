import React, { useState, useCallback, useEffect } from "react";
import { View, Text, FlatList, ScrollView, Image } from "react-native";
import {
  getCartItems,
  updateCartItem,
  removeFromCart,
} from "../../../db/index.js";
import { useFocusEffect } from "expo-router";
import CartItem from "../../../components/CartItem.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants/images.js";
import CustomButton from "../../../components/CustomButton.jsx";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalMRP, setTotalMRP] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);

  // Load cart items when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      const loadCartItems = async () => {
        const items = await getCartItems();
        setCartItems(items);
      };
      loadCartItems();
    }, []) // Dependency array is empty so it runs on each focus
  );

  const increaseQuantity = async (item) => {
    await updateCartItem(item.product_id, item.quantity + 1);
    refreshCartItems(); // Refresh cart after updating quantity
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity > 1) {
      await updateCartItem(item.product_id, item.quantity - 1);
    } else {
      await removeFromCart(item.product_id);
    }
    refreshCartItems(); // Refresh cart after updating quantity or removing item
  };

  const deleteItemFromCart = async (id) => {
    await removeFromCart(id);
    refreshCartItems();
  };

  // Separate function to refresh the cart items
  const refreshCartItems = async () => {
    const updatedItems = await getCartItems();
    setCartItems(updatedItems);
  };

  // Calculate total MRP, discount, and shipping charges
  useEffect(() => {
    const calculateTotals = () => {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const discount = total * 0.1; // 10% discount
      const totalAfterDiscount = total - discount;
      const shipping = totalAfterDiscount > 100 ? 0 : 50;

      setTotalMRP(total);
      setDiscountedTotal(totalAfterDiscount);
      setShippingCharges(shipping);
    };

    calculateTotals();
  }, [cartItems]);

  const handleCheckout = () => {
    console.log("Checkout");
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4 flex-1">
          <Text className="text-2xl font-semibold mb-4">Cart</Text>
          {cartItems.length === 0 ? (
            <View className="flex-1 items-center justify-center mt-4">
              <Text className="text-lg text-gray-500">Your cart is empty!</Text>
              <Text className="text-gray-400 mt-2">
                Add items to get started.
              </Text>
              <Image source={images.emptyCart} className="w-full h-96 mt-4" />
            </View>
          ) : (
            <>
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item.product_id.toString()}
                renderItem={({ item }) => (
                  <CartItem
                    item={item}
                    increase={() => increaseQuantity(item)}
                    decrease={() => decreaseQuantity(item)}
                    deleteItem={() => deleteItemFromCart(item.product_id)}
                  />
                )}
              />
              <View className="bg-white w-full rounded-lg shadow-lg mt-4">
                <View className="flex-row items-center justify-between p-2 border-b border-subheading">
                  <Text className="text-base text-heading">Total MRP</Text>
                  <Text className="text-base">{`Rs ${totalMRP.toFixed(
                    2
                  )}`}</Text>
                </View>
                <View className="flex-row items-center justify-between p-2 border-b border-subheading">
                  <Text className="text-base text-heading">Discount</Text>
                  <Text className="text-base">{`- Rs ${(totalMRP * 0.1).toFixed(
                    2
                  )}`}</Text>
                </View>
                <View className="flex-row items-center justify-between p-2 border-b border-subheading">
                  <Text className="text-base text-heading">
                    Shipping Charges
                  </Text>
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
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
