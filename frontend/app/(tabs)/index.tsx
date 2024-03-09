import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { Link } from "expo-router";
// import { Logo } from '@/assets/images/logo.png';
// import { Image } from 'expo-image';

import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/*
      <View style={styles.imageContainer}>
        <Image source="@/assets/images/logo.png" placeholder='logo'/>
      </View>
  */}
      <Text style={styles.title}>Euphora</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.body}>Rediscover Your Skincare Products</Text>
      <Link href="../specifyCondition" asChild>
        <TouchableHighlight style={styles.button} underlayColor="#5d680e">
          <Text style={styles.buttonText}>Specify Condition</Text>
        </TouchableHighlight>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D332A",
  },
  //   imageContainer: {
  //     flex: 1,
  //     backgroundColor: '#FFF',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     zIndex: 100,
  //   },
  title: {
    fontFamily: "PlayfairDisplay-SemiBold",
    fontSize: 60,
    color: "#FFF",
  },
  body: {
    fontFamily: "PlayfairDisplay-SemiBold",
    fontSize: 35,
    color: "#FFF",
    textAlign: "center",
    padding: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
  },
  button: {
    marginTop: 60,
    padding: 20,
    backgroundColor: "#D1E543",
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Inter-Bold",
    color: "#000",
    fontSize: 16,
  },
});
