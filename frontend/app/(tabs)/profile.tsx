import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/profile_pic.png")} />
      <Text
        style={{
          fontFamily: "PlayfairDisplay-SemiBold",
          fontSize: 35,
          marginTop: 40,
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        Anna Tan
      </Text>

      <View style={styles.selectedOptionsRow}>
        <TouchableOpacity style={styles.selectedOptionBubble}>
          <Image source={require("@/assets/images/pencil_icon.png")} />
          <Text style={styles.body}>Skin Conditions & Allergies</Text>
          <Image source={require("@/assets/images/rightarrow_icon.png")} />
        </TouchableOpacity>
      </View>

      <View style={styles.selectedOptionsRow}>
        <TouchableOpacity
          style={styles.selectedOptionBubble}
//           onPress={() => navigation.navigate("harmfulList")}
        >
          <Image source={require("@/assets/images/pencil_icon.png")} />
          <Text style={styles.body}>Harmful Ingredients</Text>
          <Image source={require("@/assets/images/rightarrow_icon.png")} />
        </TouchableOpacity>
      </View>

      <View style={styles.selectedOptionsRow}>
        <TouchableOpacity style={styles.selectedOptionBubble}>
          <Image source={require("@/assets/images/lock_icon.png")} />
          <Text style={styles.body}>Privacy and Settings</Text>
          <Image source={require("@/assets/images/rightarrow_icon.png")} />
        </TouchableOpacity>
      </View>

      <View style={styles.selectedOptionsRow}>
        <TouchableOpacity style={styles.selectedOptionBubble}>
          <Image source={require("@/assets/images/bell_icon.png")} />
          <Text style={styles.body}>Notifications</Text>
          <Image source={require("@/assets/images/rightarrow_icon.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOptionsRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  selectedOptionBubble: {
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 5,
    flex: 1,
  },
  body: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 12,
    flex: 1,
  },
});
