import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useAuth } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePost } from "../../context/postContext";

const HeaderMenu = () => {
  const [state, setState] = useAuth();
  const { setPosts } = usePost();

  //   logout
  const handleLogout = async () => {
    try {
      Alert.alert("Confirmation", "Are you sure want to logout?", [
        {
          text: "Yes",
          onPress: async () => {
            setState({ user: null, token: "" });
            setPosts([]);
            await AsyncStorage.removeItem("@auth");
            alert("Logout Successfully");
          },
        },
        { text: "Cancel" },
      ]);
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
