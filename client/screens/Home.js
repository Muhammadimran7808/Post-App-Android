import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";

const Home = () => {
  const [state] = useAuth();
  return (
    <>
      <View style={styles.container}>
        <Text>Home</Text>
        <Text>{JSON.stringify(state, null, 4)}</Text>
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
export default Home;
