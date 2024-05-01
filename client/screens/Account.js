import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import SecondaryHeader from "../components/Menus/SecondaryHeader";
import axios from "axios";
import { usePost } from "../context/postContext";

const Account = () => {
  // global state
  const [state, setState] = useAuth();
  const { profilePicture } = usePost();
  const { user } = state;
  // local state
  const [name, setName] = useState(user?.name);
  const [email] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);
  const [loading, setLoading] = useState(false);

  // update profile
  const updateProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put("/auth/update-profile", {
        name,
        email,
        password,
      });
      if (data?.success) {
        let UD = JSON.stringify(data);
        setState({ ...state, user: UD?.updatedUser });
      }
      alert(data?.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <>
      <SecondaryHeader />
      <ScrollView>
        <View style={styles.container}>
          {/* Profile image */}
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Image
              style={{ width: 200, height: 200, borderRadius: 100 }}
              source={{
                uri: profilePicture?.url,
              }}
            />
            <Text style={{ color: "red", fontSize: 12 }}>
              Currently you can only change your name and password*
            </Text>
          </View>

          {/* User details */}
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Name</Text>
            <TextInput
              value={name}
              style={styles.input}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Email</Text>
            <TextInput
              value={state?.user.email}
              style={styles.input}
              editable={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.lable}>Password</Text>
            <TextInput
              value={password}
              secureTextEntry={true}
              style={styles.input}
              placeholder="New password"
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          {/* Save button */}
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.updateBtn} onPress={updateProfile}>
              <Text style={styles.btnText}>
                {loading ? "please wait..." : "Update Profile"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 10,
  },

  inputContainer: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  lable: {
    width: "20%",
    fontSize: 14,
    color: "gray",
  },
  input: {
    width: "80%",
    fontSize: 16,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
    height: 44,
  },
  updateBtn: {
    width: "80%",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
});

export default Account;
