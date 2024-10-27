import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="orders" options={{ headerShown: false }} />
      <Stack.Screen name="address" options={{ headerShown: false }} />
      <Stack.Screen name="about-us" options={{ headerShown: false }} />
      <Stack.Screen name="contact-us" options={{ headerShown: false }} />
      <Stack.Screen name="faq" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
