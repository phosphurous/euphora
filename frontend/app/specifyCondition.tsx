import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "@/components/Themed";
import SearchBar from "@/components/SearchBar";
import List from "@/components/List";
import axios from "axios";

const API_URL = "http://13.229.232.103:3000/api/v1/profile/get_skin_types_cond";

const SpecifyConditionScreen = () => {
  const navigation = useNavigation();

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  //   const [optionClicked, setOptionClicked] = useState(false);
  const [skinTypesConditions, setSkinTypesConditions] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(API_URL);
        setSkinTypesConditions(
          response.data.skin_types_conditions.skin_conditions_option,
        );
        console.log(response.data.skin_types_conditions.skin_conditions_option);
      } catch (error) {
        return Promise.reject(error);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "PlayfairDisplay-SemiBold",
          fontSize: 35,
          marginTop: 40,
        }}
      >
        Hi Anna,
      </Text>
      <Text style={styles.title}>
        Tell us about your skin conditions and allergies.
      </Text>

      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {clicked ? (
        <List
          searchPhrase={searchPhrase}
          data={skinTypesConditions}
          setClicked={setClicked}
        />
      ) : (
        <Text
          style={styles.body}
          onPress={() => navigation.navigate("skinQuiz1")}
        >
          I don't have any skin conditions or allergies.
        </Text>
      )}
    </View>
  );
};

export default SpecifyConditionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    textAlign: "center",
  },
  body: {
    fontSize: 14,
    color: "#A6A2A2",
    textAlign: "center",
    position: "absolute",
    bottom: 100,
  },
});
