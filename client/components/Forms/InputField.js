import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const InputField = ({
  label,
  placeholder,
  keyboardType,
  secureTextEntry = false,
  autoComplete,
  value,
  setValue,
}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={styles.inputBox}
        placeholder={placeholder}
        autoCorrect={false}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoComplete={autoComplete}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    padding: 5,
    marginBottom: 15,
    borderColor: "gray",
    borderBottomWidth: 0.5,
  },
});
export default InputField;
