import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { getAllOrders } from "../../../api";
import OrderAccordion from "../../../components/orders/OrderAccordian";
import { router } from "expo-router";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getAllOrder = async () => {
      const response = await getAllOrders();
      const data = response.data;
      setOrders(data);
    };
    getAllOrder();
  }, []);

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
          <Text className="text-white font-semibold text-xl ml-2">
            My Orders
          </Text>
        </View>

        <View className="bg-white rounded-t-2xl p-4 h-full mt-12">
          <FlatList
            showsVerticalScrollIndicator={false}
            className="mt-2 mb-8"
            data={orders}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <OrderAccordion order={item} />}
          />
        </View>
      </View>
      <StatusBar translucent />
    </SafeAreaView>
  );
};

export default Orders;
