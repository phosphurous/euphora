// List.js
import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
  </View>
);

//const List = ({ searchPhrase, setClicked, data }) => {
const List = ({ searchPhrase, data }) => {
  const renderItem = ({ item }) => {
    //When there is no input, show all
    if (searchPhrase === "") {
      return <Item name={item} details={""} />;
    }
    // filter of the name
    if (
      item
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item} details={""} />;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
//        onStartShouldSetResponder={() => {
//          setClicked(false);
//        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />

      </View>
    </SafeAreaView>
  );
};

// ORIGINAL:
////The filter
//const List = ({ searchPhrase, setClicked, data }) => {
//  const renderItem = ({ item }) => {
//    //When there is no input, show all
//    if (searchPhrase === "") {
//      return <Item name={item.name} details={item.details} />;
//    }
//    // filter of the name
//    if (
//      item.name
//        .toUpperCase()
//        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
//    ) {
//      return <Item name={item.name} details={item.details} />;
//    }
//    // filter of the description
//    if (
//      item.details
//        .toUpperCase()
//        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
//    ) {
//      return <Item name={item.name} details={item.details} />;
//    }
//  };
//
//  return (
//    <SafeAreaView style={styles.list__container}>
//      <View
//        onStartShouldSetResponder={() => {
//          setClicked(false);
//        }}
//      >
//        <FlatList
//          data={data}
//          renderItem={renderItem}
//          keyExtractor={(item) => item.id.toString()}
//        />
//      </View>
//    </SafeAreaView>
//  );
//};

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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
