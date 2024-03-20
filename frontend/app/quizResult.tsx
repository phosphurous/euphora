import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function quizResult() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/profile_pic.png")} />
      <Text
        style={{
          fontFamily: "PlayfairDisplay-SemiBold",
          fontSize: 35,
          marginTop: 40,
          textAlign: "center",
        }}
      >
        You have combination skin.
      </Text>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#5d680e"
        onPress={() => navigation.navigate("profile")}
      >
        <Text style={styles.buttonText}>Go to Profile</Text>
      </TouchableHighlight>
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
