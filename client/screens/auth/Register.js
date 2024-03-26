import { View, Text, StyleSheet, Alert, StatusBar } from "react-native";
import React, { useState } from "react";
import InputField from "../../components/Forms/InputField";
import SubmitButton from "../../components/Forms/SubmitButton";

const Register = ({ navigation }) => {
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
        setTimeout(() => {}, 3000);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#F27676"} />
      <Text style={styles.pageTitle}>Create Account</Text>
      <Text style={{ textAlign: "center", color: "gray" }}>
        Create a new Account
      </Text>

      {/* form */}
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
          keyboardType={"email-address"}
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

      {/* Sign in button */}
      <SubmitButton
        text={"SIGN UP"}
        loading={loading}
        handleSubmit={handleSubmit}
      />

      <Text style={{ textAlign: "center", marginTop: 10 }}>
        Already have an account?{" "}
        <Text
          style={{ color: "#F27676" }}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
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
