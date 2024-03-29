import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const FooterMenu = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity>
        <FontAwesome5 name="home" style={styles.icon} />
        <Text style={styles.footerItem}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <FontAwesome5 name="plus-square" style={styles.icon} />
        <Text style={styles.footerItem}>Post</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <FontAwesome5 name="info-circle" style={styles.icon} />
        <Text style={styles.footerItem}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <FontAwesome5 name="user" style={styles.icon} />
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
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  footerItem: {
    color: "white",
    fontSize: 17,
  },

  icon: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
    color: "white",
  },
});
export default FooterMenu;
