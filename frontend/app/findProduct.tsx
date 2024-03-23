import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
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
        product.name.toLowerCase().includes(searchPhrase.toLowerCase()),
      ),
    );
  }, [searchPhrase, skinTypesConditions]);

  const handleOptionClick = (option) => {
    // Check if the option is already selected
    if (selectedOptions.includes(option)) {
      // If already selected, replace it with the new option
      const updatedOptions = selectedOptions.map((selectedOption) =>
        selectedOption === option ? option : selectedOption,
      );
      setSelectedOptions(updatedOptions);
    } else {
      // If not selected, add the new option
      setSelectedOptions([option]);
    }
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
          <TouchableOpacity key={index} style={styles.selectedOptionBubble}>
            <Text style={styles.optionBubbleText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "80%", // Set width to 90% of screen width
          alignItems: "flex-start", // Align children to the start of the container
          alignSelf: "center",
        }}
      >
        <Text style={styles.title}>Search for your product</Text>
      </View>

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
                  navigation.navigate("ingredientsAnalysisSearch", { productID: product.product_id, productName: product.name });
                }}
              >
                <Text style={styles.productName}>{product.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Text
          style={styles.body}
          onPress={() => navigation.navigate("scan")}
        >
          Couldn't find your product? Scan the ingredients of your product
          instead.
        </Text>
      )}
      <TouchableOpacity
        style={[styles.nextButton, { opacity: isNextDisabled ? 0.5 : 1 }]}
        onPress={() => {navigation.navigate("ingredientsAnalysisSearch", { productName: selectedOptions })}}
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
  },
  body: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
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
    fontSize: 16,
    maxWidth: "90%",
  },
  optionBubbleText: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
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
    maxHeight: "50%",
  },
  productItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productName: {
    fontSize: 18,
  },
});

export default FindProductScreen;
