import { StyleSheet, Image, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function quizResult() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/profile_pic.png')} />
      <Text
        style={{
          fontFamily: "PlayfairDisplay-SemiBold",
          fontSize: 35,
          marginTop: 40,
        }}
      >
        You have oily skin.
      </Text>
      <TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
          <Text style={{ fontSize: 18, flex: 1, }}>Skin Conditions & Allergies</Text>
        </View>
      </TouchableOpacity>
      <EditScreenInfo path="app/quizResult.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
