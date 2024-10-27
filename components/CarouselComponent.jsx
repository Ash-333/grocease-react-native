import React, { useEffect, useRef, useState } from "react";
import { View, Text, Dimensions, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { images } from "../constants/images";

const { width: screenWidth } = Dimensions.get("window");

const data = [
  { title: "First Image", img: images.carousel },
  { title: "Second Image", img: images.carousel },
  { title: "Third Image", img: images.carousel },
  { title: "Third Image", img: images.carousel },
  { title: "Third Image", img: images.carousel },
];

const CarouselComponent = () => {
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (index + 1) % data.length;
        carouselRef.current.snapToItem(nextIndex); // Move to the next slide
      }
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [index]);

  const renderItem = ({ item }) => {
    return <Image source={item.img} className="w-full h-40 rounded-lg" />;
  };

  return (
    <View className="justify-center items-center">
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.95}
        onSnapToItem={(index) => setIndex(index)}
        loop={true}
      />
    </View>
  );
};

export default CarouselComponent;
