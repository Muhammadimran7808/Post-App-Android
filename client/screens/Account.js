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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

const Account = () => {
  // global state
  const [state, setState] = useAuth();
  const { profilePicture, getProfilePicture } = usePost();
  const { user } = state;
  // local state
  const [name, setName] = useState(user?.name);
  const [email] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState();

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

  // select picture
  const selectPicture = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    const imageData = result?.assets[0];
    console.log(imageData);
    if (!result?.canceled) {
      console.log("jjjjjjjj");
      setImage(imageData);
      console.log("-------", image);
      updateProfilePicture();
    }
  };

  // update profile picture
  const updateProfilePicture = async () => {
    setLoading(true);
    try {
      console.log(image);
      var formdata = new FormData();
      formdata.append("file", {
        uri: image?.uri,
        type: "image/jpeg",
        name: image?.uri.split("/").pop(),
      });

      const { data } = await axios.put("/auth/update-picture", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        getProfilePicture();
        console.log("yesssss");
      }
      alert(data?.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      console.log("jiiiiiiiiiiiiiiiiii");
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
            <TouchableOpacity
              style={styles.camera}
              onPress={() => selectPicture()}
            >
              <FontAwesome5 name="camera" size={22} color={"#fff"} />
            </TouchableOpacity>
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
  camera: {
    position: "absolute",
    bottom: 10,
    right: "22%",
    backgroundColor: "#00000080",
    padding: 7,
    borderRadius: 50,
    color: "white",
  },
});

export default Account;
