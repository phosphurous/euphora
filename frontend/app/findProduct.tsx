import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { BACKEND_URL } from "@env";

const API_URL = `${BACKEND_URL}/api/v1/products/search?q=`;

const FindProductScreen = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width; // Get window width

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]); // To store selected options
  const [skinTypesConditions, setSkinTypesConditions] = useState([]); // To store product data
  const [isNextDisabled, setIsNextDisabled] = useState(true); // State variable to track if Next button should be disabled
  const [filteredResults, setFilteredResults] = useState([]); // State variable to store filtered search results

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(API_URL + searchPhrase); // Include search phrase in API call
        setSkinTypesConditions(response.data);
      } catch (error) {
        // Handle error
      }
    };
    getData();
  }, [searchPhrase]); // Fetch data whenever search phrase changes

  useEffect(() => {
    // Update isNextDisabled based on selectedOptions
    setIsNextDisabled(selectedOptions.length === 0);
  }, [selectedOptions]);

  useEffect(() => {
    // Filter results based on search phrase
    setFilteredResults(
      skinTypesConditions.filter((product) =>
        product.name.toLowerCase().includes(searchPhrase.toLowerCase())
      )
    );
  }, [searchPhrase, skinTypesConditions]);

  const handleOptionClick = (option) => {
    setSelectedOptions([...selectedOptions, option]); // Add selected option to the list
  };

  const removeOption = (optionToRemove) => {
    setSelectedOptions(selectedOptions.filter((option) => option !== optionToRemove));
  };

  // Function to wrap selected options into rows
  const renderOptions = () => {
    let rows = [];
    let row = [];
    let totalWidth = 0;

    selectedOptions.forEach((option, index) => {
      const optionWidth = option.length * 10 + 40; // Rough estimation of option width
      if (totalWidth + optionWidth > windowWidth) {
        rows.push(row);
        row = [option];
        totalWidth = optionWidth;
      } else {
        row.push(option);
        totalWidth += optionWidth;
      }
    });

    if (row.length > 0) {
      rows.push(row);
    }

    return rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.selectedOptionsRow}>
        {row.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.selectedOptionBubble}
            onPress={() => removeOption(option)}
          >
            <Text>{option}</Text>
            <Image
              source={require("@/assets/images/x_icon.png")}
              style={styles.xIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for your product</Text>

      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <View style={styles.selectedOptionsContainer}>{renderOptions()}</View>
      {clicked ? (
        <SafeAreaView style={styles.listContainer}>
          <ScrollView>
            {filteredResults.map((product) => (
              <TouchableOpacity
                key={product.product_id}
                style={styles.productItem}
                onPress={() => {
                  handleOptionClick(product.name);
                  setClicked(false);
                }}
              >
                <Text style={styles.productName}>{product.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Text style={styles.body} onPress={() => navigation.navigate("skinQuiz1")}>
          I don't have any skin conditions or allergies.
        </Text>
      )}
      <TouchableOpacity
        style={[styles.nextButton, { opacity: isNextDisabled ? 0.5 : 1 }]}
        onPress={() => navigation.navigate("skinQuiz1")}
        disabled={isNextDisabled}
      >
        <Text style={{ color: "black" }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    textAlign: "left",
  },
  body: {
    fontSize: 14,
    color: "#A6A2A2",
    textAlign: "center",
    position: "absolute",
    bottom: 100,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  selectedOptionsContainer: {
    marginTop: 20,
  },
  selectedOptionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOptionBubble: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 5,
  },
  xIcon: {
    width: 12,
    height: 12,
    marginLeft: 5,
  },
  nextButton: {
    backgroundColor: "#D1E543",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  listContainer: {
    width: "80%",
    maxHeight: "50%", // Adjust the max height as needed
  },
  productItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productName: {
    fontSize: 18,
//     fontWeight: "bold",
  },
});

export default FindProductScreen;
