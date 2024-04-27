import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";

const SecondaryHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          borderBottomWidth: route.name === "Home" ? 2 : 0,
          borderBottomColor: route.name === "Home" ? "#0866FF" : "white",
        }}
        onPress={() => navigation.navigate("Home")}
      >
        <FontAwesome5
          name="home"
          style={styles.icon}
          color={route.name === "Home" ? "#0866FF" : "black"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          borderBottomWidth: route.name === "Post" ? 2 : 0,
          borderBottomColor: route.name === "Post" ? "#0866FF" : "white",
        }}
        onPress={() => navigation.navigate("Post")}
      >
        <FontAwesome5
          name="plus-square"
          style={styles.icon}
          color={route.name === "Post" ? "#0866FF" : "black"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          borderBottomWidth: route.name === "MyPosts" ? 2 : 0,
          borderBottomColor: route.name === "MyPosts" ? "#0866FF" : "white",
        }}
        onPress={() => navigation.navigate("MyPosts")}
      >
        <FontAwesome5
          name="list"
          style={styles.icon}
          color={route.name === "MyPosts" ? "#0866FF" : "black"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          paddingHorizontal: 10,
          borderBottomWidth: route.name === "Account" ? 2 : 0,
          borderBottomColor: route.name === "Account" ? "#0866FF" : "white",
        }}
        onPress={() => navigation.navigate("Account")}
      >
        <FontAwesome5
          name="user"
          style={styles.icon}
          color={route.name === "Account" ? "#0866FF" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },

  icon: {
    padding: 5,
    alignSelf: "center",
    fontSize: 25,
  },
});
export default SecondaryHeader;
