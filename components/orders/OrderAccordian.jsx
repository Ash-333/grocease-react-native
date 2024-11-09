import { View, Text } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import moment from "moment";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

const StatusCard = ({ title, description, isCompleted }) => (
  <View
    className={`p-4 rounded-lg my-2 mx-4 ${
      isCompleted ? "bg-green-100" : "bg-gray-100"
    }`}
  >
    <Text className="text-lg font-bold">{title}</Text>
    <Text className="text-sm text-gray-700">{description}</Text>
  </View>
);

const OrderAccordion = ({ order }) => {
  const { _id, items, status, createdAt } = order;
  const orderId = _id.slice(-6).toUpperCase();
  const totalItems = items.length;
  const formattedDate = moment(createdAt).format("D, MMMM YYYY");

  return (
    <Collapse className="bg-cardbg shadow-md rounded-xl mb-4 pb-2">
      <CollapseHeader>
        <View className="flex-row items-center p-4">
          <View className="h-12 w-12 rounded-full bg-green-100 justify-center items-center mr-4">
            <Feather name="shopping-bag" size={24} color="#55AB60" />
          </View>
          <View className="ml-4">
            <Text className="text-lg font-semibold">{`Order Id  #${orderId}`}</Text>
            <Text className="text-base text-gray-500">{`${totalItems} items`}</Text>
            <Text className="text-sm text-gray-400">{formattedDate}</Text>
          </View>
        </View>
      </CollapseHeader>
      <CollapseBody>
        {status === "Cancelled" ? (
          <StatusCard
            title="Order Cancelled"
            description="Your order has been cancelled."
            isCompleted
          />
        ) : (
          <>
            <StatusCard
              title="Order Placed"
              description="Your order has been placed."
              isCompleted
            />
            {status !== "Pending" && (
              <StatusCard
                title="Order Confirmed"
                description="Your order has been confirmed."
                isCompleted
              />
            )}
            {(status === "Shipped" || status === "Delivered") && (
              <StatusCard
                title="Order Shipped"
                description="Your order is on the way."
                isCompleted={status === "Shipped" || status === "Delivered"}
              />
            )}
            {status === "Delivered" && (
              <StatusCard
                title="Order Delivered"
                description="Your order has been delivered."
                isCompleted
              />
            )}
          </>
        )}
      </CollapseBody>
    </Collapse>
  );
};

export default OrderAccordion;
