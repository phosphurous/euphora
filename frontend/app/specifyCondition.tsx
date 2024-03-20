import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import SearchBar from "@/components/SearchBar";
import List from "@/components/List";
import axios from "axios";
import { Link } from "expo-router";
import {BACKEND_URL} from '@env'

const API_URL = `${BACKEND_URL}/api/v1/profile/get_skin_types_cond`;

const SpecifyConditionScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [optionClicked, setOptionClicked] = useState(false);
  const [skinTypesConditions, setSkinTypesConditions] = useState(null);

  //Get data from the fake api endpoint
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
          setClicked={setOptionClicked}
        />
      ) : (
        <Link href="/skinQuiz1" asChild>
          <Text style={styles.body}>
            I don't have any skin conditions or allergies.
          </Text>
        </Link>
      )}

      {optionClicked ? console.log("clicked") : console.log("not clicked")}
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
});
