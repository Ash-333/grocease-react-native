import { Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import { router } from "expo-router";
import { addToCart, getCartItems } from "../../db";

const Card = ({ item }) => {
  const [isInCart, setIsInCart] = useState(false);

  // Check if the item is already in the cart
  useEffect(() => {
    const checkCart = async () => {
      try {
        const cartItems = await getCartItems();
        const itemInCart = cartItems.some(
          (cartItem) => cartItem.product_id === item._id
        );
        setIsInCart(itemInCart);
      } catch (error) {
        console.error("Error checking cart:", error);
      }
    };
    checkCart();
  }, []);

  const handleClick = () => {
    router.push(`/home/top-products/${item._id}`);
  };

  const handleAddCart = async () => {
    if (isInCart) {
      router.replace("/cart");
    } else {
      await addToCart(
        item._id,
        item.name,
        1,
        item.price,
        item.category.name,
        item.image
      );
      setIsInCart(true);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleClick}
      className="p-4 w-[160px] h-60 bg-cardbg rounded-lg m-2"
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-1/2"
        resizeMode="contain"
      />
      <Text className="text-xl font-semibold mt-1" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="text-primary text-lg ">RS {item.price}</Text>
      <CustomButton
        handlePress={handleAddCart}
        title={isInCart ? "Go to Cart" : "Add to Cart"}
        containerStyles="bg-transparent border border-primary h-8 mt-3 rounded-lg"
        textStyle="font-semibold text-primary text-base"
      />
    </TouchableOpacity>
  );
};

export default Card;
