import { View, Text, Image } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const CartItem = ({ item, increase, decrease, deleteItem }) => {
  return (
    <View className="h-36 w-full p-4 bg-white rounded-lg shadow-md flex-row items-center mb-4">
      <Image
        source={{ uri: item.image }}
        resizeMode="contain"
        className="h-full w-20 rounded-lg mr-4"
      />

      <View className="flex-1 justify-between ml-5">
        {/* Top Row: Item Name and Remove Icon */}
        <View className="flex-row items-center justify-between mb-2">
          <Text
            className="text-lg font-montserrat font-semibold flex-1"
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <TouchableOpacity onPress={() => deleteItem(item.product_id)}>
            <Entypo name="cross" size={24} color="red" />
          </TouchableOpacity>
        </View>

        <View className="flex-col">
          <Text className="text-primary font-medium text-lg mb-2">
            RS {item.price}
          </Text>

          <View className="flex-row items-center space-x-2 mt-2">
            <TouchableOpacity
              onPress={() => increase(item)}
              className="p-1 bg-primary rounded-full"
            >
              <MaterialIcons name="add" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-subheading text-lg">
              Qty: {item.quantity}
            </Text>

            <TouchableOpacity
              onPress={() => decrease(item)}
              className="p-1 bg-primary rounded-full"
            >
              <MaterialIcons name="remove" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
