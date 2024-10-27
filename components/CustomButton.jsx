import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyle,
  isLoading,
  imageSource,
  imageStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-primary rounded-xl justify-center items-center flex-row ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      {imageSource && <Image source={imageSource} className={imageStyle} />}
      <Text className={`font-semibold text-lg ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
