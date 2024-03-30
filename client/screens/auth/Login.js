import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import InputField from "../../components/Forms/InputField";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const Login = ({ navigation }) => {
  // global state
  const [state, setState] = useAuth();
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
        const { data } = await axios.post("/auth/login", {
          email,
          password,
        });
        if (data) {
          setState(data); //set data in lobal state
          // adding user info in local storage
          await AsyncStorage.setItem("@auth", JSON.stringify(data));
          Alert.alert(data.message);
          navigation.navigate("Home");
        }
      }
    } catch (error) {
      Alert.alert(error.response.data.message);
      console.log(error);
    }
    setLoading(false);
  };

  // temp function to check local storage data
  // const getLocalStorageData = async () => {
  //   const data = await AsyncStorage.getItem("@auth");
  //   console.log("local storage data ==> ", data);
  // };

  // getLocalStorageData();

  return (
    <View style={styles.container}>
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
