import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FooterMenu from "../components/Menus/FooterMenu";

const About = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
        <FooterMenu />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 10,
  },
});

export default About;
