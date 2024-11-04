import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getUserAddress } from "../../../api";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";
import FormField from "../../../components/FormField";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Address = () => {
  const [address, setAddress] = useState([]);
  const modalizeRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form, setForm] = useState({
    name: "",
    addressline1: "",
    addressline2: "",
    city: "",
    phoneNumber: "",
  });

  const openModal = useCallback(() => {
    modalizeRef.current?.open();
  }, [modalizeRef]);

  useEffect(() => {
    const getAddress = async () => {
      const response = await getUserAddress();
      const defaultItem = response.data.find((item) => item.isDefault);
      if (defaultItem) {
        setSelectedItem(defaultItem._id);
      }
      setAddress(response.data);
    };
    getAddress();
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View className="bg-primary">
          <Text className="text-xl font-semibold text-white p-4">
            My Addresses
          </Text>
          <View className="p-4 rounded-t-2xl mt-12 bg-white h-full">
            <TouchableOpacity
              onPress={openModal}
              className="flex-row items-center"
            >
              <MaterialIcons
                name="add-circle-outline"
                size={24}
                color="#55AB60"
              />
              <Text className="ml-2 text-primary text-lg font-medium">
                Add new Address
              </Text>
            </TouchableOpacity>
            {/**address radio button */}
            <View>
              {address.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => setSelectedItem(item._id)}
                >
                  <View className="flex-row mt-4 items-center">
                    <View className="h-6 w-6 rounded-full border border-black flex justify-center items-center">
                      {selectedItem == item._id && (
                        <View className="h-4 w-4 rounded-full bg-primary"></View>
                      )}
                    </View>
                    <View className="w-72 h-28 ml-2 rounded-xl shadow-xl p-4 bg-white">
                      <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center">
                          <MaterialCommunityIcons
                            name="office-building-outline"
                            size={24}
                            color="black"
                          />
                          <Text className="font-semibold font-montserrat text-xl ml-2">
                            Office
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                          <MaterialIcons
                            name="mode-edit-outline"
                            size={24}
                            color="black"
                          />
                          <MaterialIcons
                            name="delete"
                            size={24}
                            color="black"
                          />
                        </View>
                      </View>
                      <Text>{item.fullName}</Text>
                      <Text>
                        {`${item.addressLine1}, ${item.addressLine2}, ${item.city}`}
                      </Text>
                      <Text>{item.phoneNumber}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <Modalize ref={modalizeRef} snapPoint={300} className="bg-secondary">
          <View className="p-4">
            <FormField
              title="Name"
              value={form.name}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              otherStyles="mt-6"
            />
            <FormField
              title="Address line 1"
              value={form.addressline1}
              handleChangeText={(e) => setForm({ ...form, addressline1: e })}
              otherStyles="mt-4"
            />
            <FormField
              title="Address line 2"
              value={form.addressline2}
              handleChangeText={(e) => setForm({ ...form, addressline2: e })}
              otherStyles="mt-4"
            />
            <FormField
              title="Phone Number"
              value={form.phoneNumber}
              handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
              otherStyles="mt-4 mb-4"
            />
            <CustomButton
              title="Save Address"
              onPress={() => console.log("clicked")}
              textStyle="text-white"
              containerStyles="h-14"
            />
          </View>
        </Modalize>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Address;
