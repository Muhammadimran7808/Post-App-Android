import { View, Text, StyleSheet, TextInput, Alert, StatusBar } from "react-native";
import React, { useState } from "react";
import InputField from "../../components/Forms/InputField";
import SubmitButton from "../../components/Forms/SubmitButton";

const Register = () => {
  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = () => {
    try {
      if (!name || !email || !password) {
        return Alert.alert("Please fill fields");
      } else {
        setLoading(true);
        // call your api here
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#F27676"}/>
      <Text style={styles.pageTitle}>Create Account</Text>
      <Text style={{ textAlign: "center", color: "gray" }}>
        Create a new Account
      </Text>
      <View style={styles.form}>
        <InputField
          label={"Name*"}
          placeholder={"Your name"}
          autoComplete={"name"}
          value={name}
          setValue={setName}
        />
        <InputField
          label={"Email*"}
          placeholder={"Your email"}
          keyboardType="email-address"
          autoComplete={"email"}
          value={email}
          setValue={setEmail}
        />
        <InputField
          label={"Password*"}
          placeholder={"New password"}
          autoComplete={"password"}
          secureTextEntry={true}
          value={password}
          setValue={setPassword}
        />
      </View>
      <SubmitButton
        text={"SIGN UP"}
        loading={loading}
        handleSubmit={handleSubmit}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 5,
          marginTop: 10,
        }}
      >
        <Text>Already have an account?</Text>
        <Text style={{ color: "#F27676" }}>Login</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 50,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
  },
  form: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  inputBox: {
    padding: 5,
    marginBottom: 15,
    borderColor: "gray",
    borderBottomWidth: 0.5,
  },
});
export default Register;
