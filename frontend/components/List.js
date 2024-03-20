import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Text } from "@/components/Themed";

const Item = ({ name, details, onPress }) => (
  <TouchableOpacity onPress={() => onPress(name)} style={styles.item}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
  </TouchableOpacity>
);

const List = ({ searchPhrase, data, onOptionClick }) => {
  const renderItem = ({ item }) => {
    // When there is no input, show all
    if (searchPhrase === "") {
      return (
        <Item name={item} details={""} onPress={() => onOptionClick(item)} />
      );
    }
    // Filter of the name
    if (
      item
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item name={item} details={""} onPress={() => onOptionClick(item)} />
      );
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "90%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    color: "grey",
  },
});
