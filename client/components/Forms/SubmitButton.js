import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SubmitButton = ({ text, loading, handleSubmit }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
      <Text style={styles.btnTxt}>{loading ? "Please wait..." : text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#F27676",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 20,
  },

  btnTxt: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SubmitButton;
