import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useAuth } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenu = () => {
  const [state, setState] = useAuth();

  //   logout
  const handleLogout = async () => {
    try {
      setState({ user: null, token: "" });
      await AsyncStorage.removeItem("@auth");
      alert("Logout Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={handleLogout}>
          <FontAwesome5
            name="sign-out-alt"
            color={"red"}
            style={{ fontSize: 22 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderMenu;
