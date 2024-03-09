import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import SearchBar from "@/components/SearchBar";
import List from "@/components/List";

const SpecifyConditionScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  //Get data from the fake api endpoint
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages",
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "PlayfairDisplay-SemiBold", fontSize: 40 }}>
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
          data={fakeData}
          setClicked={setClicked}
        />
      ) : null}
    </View>
  );
};

export default SpecifyConditionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
