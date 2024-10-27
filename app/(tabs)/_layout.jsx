import { Image, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { icons } from "../../constants/icons";

const TabIcon = ({ icon, color, name, focus }) => {
  return (
    <View className="justify-center items-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focus ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#55AB60",
        tabBarInactiveTintColor: "#CDCDE0",
        height: 84,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name={"Home"}
              focus={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.cart}
              color={color}
              name={"Cart"}
              focus={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name={"Profile"}
              focus={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
