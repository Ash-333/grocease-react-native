import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HorizontalView from "../../../components/explore/HorizontalView";
import { getAllProducts } from "../../../api";

// const fruits = [
//   {
//     id: 1,
//     name: "Apple",
//     image: "https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg",
//     price: 1.2, // price per unit
//     quantity: 100, // quantity available in stock
//   },
//   {
//     id: 2,
//     name: "Banana",
//     image: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg",
//     price: 0.5,
//     quantity: 200,
//   },
//   {
//     id: 3,
//     name: "Orange",
//     image: "https://images.pexels.com/photos/54369/pexels-photo-54369.jpeg",
//     price: 1.1,
//     quantity: 150,
//   },
//   {
//     id: 4,
//     name: "Strawberry",
//     image: "https://images.pexels.com/photos/1258264/pexels-photo-1258264.jpeg",
//     price: 3.0,
//     quantity: 50,
//   },
//   {
//     id: 5,
//     name: "Grapes",
//     image: "https://images.pexels.com/photos/23042/pexels-photo.jpg",
//     price: 2.5,
//     quantity: 75,
//   },
//   {
//     id: 6,
//     name: "Watermelon",
//     image: "https://images.pexels.com/photos/2257345/pexels-photo-2257345.jpeg",
//     price: 4.0,
//     quantity: 20,
//   },
//   {
//     id: 7,
//     name: "Mango",
//     image: "https://images.pexels.com/photos/4955253/pexels-photo-4955253.jpeg",
//     price: 1.8,
//     quantity: 120,
//   },
//   {
//     id: 8,
//     name: "Pineapple",
//     image: "https://images.pexels.com/photos/947879/pexels-photo-947879.jpeg",
//     price: 2.8,
//     quantity: 30,
//   },
//   {
//     id: 9,
//     name: "Blueberry",
//     image: "https://images.pexels.com/photos/139749/pexels-photo-139749.jpeg",
//     price: 5.0,
//     quantity: 45,
//   },
//   {
//     id: 10,
//     name: "Avocado",
//     image: "https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg",
//     price: 2.2,
//     quantity: 60,
//   },
// ];

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getAllProducts();
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView>
      <ScrollView nestedScrollEnabled>
        <View className="p-4">
          <Text className="text-xl font-bold text-center">
            Explore all categories
          </Text>
          <HorizontalView title="Groceries" data={products} />
          <HorizontalView title="Fruits" data={products} />
          <HorizontalView title="Dairy Products" data={products} />
          <HorizontalView title="Bareky Items" data={products} />
          <HorizontalView title="Beverages" data={products} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopProducts;
