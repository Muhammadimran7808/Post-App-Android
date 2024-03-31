import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useAuth } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";

const Account = () => {
  const [state] = useAuth();
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 10}}>
        <Image
          style={{ width: 200, height: 200 }}
          source={{
            uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
          }}
        />
        <Text style={{color: "red", fontSize:12}}>
          Currently you can only change your name and password*
        </Text>
      </View>
      <Text>Name: {state?.user.name}</Text>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Account;
