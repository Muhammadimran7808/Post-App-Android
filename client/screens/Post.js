import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FooterMenu from "../components/Menus/FooterMenu";

const Post = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Post;
