import { View, Text } from "react-native";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addNewAddress } from "../../api";

const AddNewAddress = () => {
  const [form, setForm] = useState({
    name: "",
    addressline1: "",
    addressline2: "",
    city: "",
    phoneNumber: "",
  });

  const handleAddress = async () => {
    try {
      // Retrieve userId from AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in storage.");
        return;
      }

      // Create form data object with userId and form values
      const formData = {
        userId: userId,
        fullName: form.name,
        addressLine1: form.addressline1,
        addressLine2: form.addressline2,
        city: form.city,
        phoneNumber: form.phoneNumber,
      };
      console.log(formData);

      // Send form data to API
      const response = await addNewAddress(formData);

      if (response && response.success) {
        console.log("Address saved successfully:", response.data);
      } else {
        console.error("Failed to save address:", response.error);
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <View className="p-4 flex-1 relative bg-white mt-10">
      <Text className="text-xl font-semibold text-center mb-4 font-montserrat">
        Add New Address
      </Text>
      <FormField
        title="Name"
        value={form.name}
        handleChangeText={(e) => setForm({ ...form, name: e })}
        otherStyles="mt-6"
      />
      <FormField
        title="Address Line 1"
        value={form.addressline1}
        handleChangeText={(e) => setForm({ ...form, addressline1: e })}
        otherStyles="mt-4"
      />
      <FormField
        title="Address Line 2"
        value={form.addressline2}
        handleChangeText={(e) => setForm({ ...form, addressline2: e })}
        otherStyles="mt-4"
      />
      <FormField
        title="City"
        value={form.city}
        handleChangeText={(e) => setForm({ ...form, city: e })}
        otherStyles="mt-4"
      />
      <FormField
        title="Phone Number"
        value={form.phoneNumber}
        handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
        otherStyles="mt-4 mb-6"
      />
      <CustomButton
        title="Save Address"
        handlePress={handleAddress}
        textStyle="text-white"
        containerStyles="h-14"
      />
    </View>
  );
};

export default AddNewAddress;
