import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../../api";

const TopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await getAllCategories();
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, []);
  return (
    <View>
      <Text>{categories}</Text>
    </View>
  );
};

export default TopCategories;
