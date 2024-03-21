// SearchBar.js
// reference: https://www.scaler.com/topics/react-native-search-bar/
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        <Feather
          name="search"
          size={18}
          color="#131214"
          style={{ marginLeft: 10 }}
        />

        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>

      {clicked && (
        <View style={{ marginLeft: 10 }}>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar__unclicked: {
    padding: 8,
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#F2F4F5",
    borderRadius: 12,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 8,
    flexDirection: "row",
    width: "69%",
    backgroundColor: "#F2F4F5",
    borderRadius: 12,
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    marginLeft: 20,
    width: "80%",
  },
});
