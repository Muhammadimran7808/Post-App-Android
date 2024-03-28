import { View, Text, StyleSheet, Alert, StatusBar } from "react-native";
import React, { useState } from "react";
import InputField from "../../components/Forms/InputField";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";

const Login = ({ navigation }) => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // handle submit
  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        return Alert.alert("Please fill fields");
      } else {
        setLoading(true);
        // api
        const { data } = await axios.post(
          "http://192.168.201.45:8080/api/v1/auth/login",
          {
            email,
            password,
          }
        );
        Alert.alert(data && data.message);
      }
    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#F27676"} />
      <Text style={styles.pageTitle}>Login</Text>
      <Text style={{ textAlign: "center", color: "gray" }}>
        Please login to continue
      </Text>

      {/* form */}
      <View style={styles.form}>
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
          placeholder={"Enter your password"}
          autoComplete={"password"}
          secureTextEntry={true}
          value={password}
          setValue={setPassword}
        />
      </View>

      {/* Login in button */}
      <SubmitButton
        text={"Login"}
        loading={loading}
        handleSubmit={handleSubmit}
      />

      <Text style={{ textAlign: "center", marginTop: 10 }}>
        Don't have an account?{" "}
        <Text
          style={{ color: "#F27676" }}
          onPress={() => navigation.navigate("Register")}
        >
          Sign up
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

export default Login;
