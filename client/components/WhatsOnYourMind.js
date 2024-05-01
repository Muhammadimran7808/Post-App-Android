import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { usePost } from "../context/postContext";

const WhatsOnYourMind = () => {
  const navigation = useNavigation();
  const {profilePicture} = usePost();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 100 }}
          source={{
            uri: profilePicture?.url,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}
        useNavigation
        onPress={() => navigation.navigate("Post")}
      >
        <Text>What's on your mind?</Text>
      </TouchableOpacity>
      <Image
        style={{ width: 35, height: 35 }}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHn3LNC6fjUSltD0lmb41LIisJMbv9KWFi6xN_R9UauFx09ypo4m5ZP-loyGSuDaIiWew&usqp=CAU",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  input: {
    width: "70%",
    height: 33,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "lightgray",
    justifyContent: "center",
    paddingLeft: 15,
  },
});

export default WhatsOnYourMind;
