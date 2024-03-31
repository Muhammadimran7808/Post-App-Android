import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={{ paddingHorizontal: 8 }}
        onPress={() => navigation.navigate("Home")}
      >
        <FontAwesome5
          name="home"
          style={styles.icon}
          color={route.name === "Home" ? "white" : "#d1d1d1"}
        />
        <Text style={styles.footerItem}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ paddingHorizontal: 8 }}
        onPress={() => navigation.navigate("Post")}
      >
        <FontAwesome5
          name="plus-square"
          style={styles.icon}
          color={route.name === "Post" ? "white" : "#d1d1d1"}
        />
        <Text style={styles.footerItem}>Post</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ paddingHorizontal: 8 }}
        onPress={() => navigation.navigate("About")}
      >
        <FontAwesome5
          name="info-circle"
          style={styles.icon}
          color={route.name === "About" ? "white" : "#d1d1d1"}
        />
        <Text style={styles.footerItem}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ paddingHorizontal: 8 }}
        onPress={() => navigation.navigate("Account")}
      >
        <FontAwesome5
          name="user"
          style={styles.icon}
          color={route.name === "Account" ? "white" : "#d1d1d1"}
        />
        <Text style={styles.footerItem}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F27676",
    paddingVertical: 8,
  },

  footerItem: {
    color: "white",
    fontSize: 13,
  },

  icon: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 22,
  },
});
export default FooterMenu;
