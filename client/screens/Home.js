import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useAuth } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";

const Home = () => {
  const [state] = useAuth();
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text>Home</Text>
          <Text>{JSON.stringify(state, null, 4)}</Text>
        </View>
      </ScrollView>
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
