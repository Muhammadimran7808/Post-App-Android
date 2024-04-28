import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import SecondaryHeader from "../components/Menus/SecondaryHeader";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { usePost } from "../context/postContext";

const Post = ({ navigation }) => {
  // global state
  const {posts, setPosts, fetchPost} = usePost();
  // local state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // handle post data
  const handlePost = async () => {
    try {
      if (!title || !description) {
        return Alert.alert("Please fill all field");
      }
      setLoading(true);
      const { data } = await axios.post("/post/create-post", {
        title,
        description,
      });
      Alert.alert(data?.message);
      setPosts([data?.post, ...posts]);
      setTitle("");
      setDescription("");
      setLoading(false);
      navigation.navigate("Home");
      fetchPost();
    } catch (error) {
      alert(error.response.data.message || error.meesage);
      console.log(error.response.data.message || error.meesage);
      setLoading(false);
    }
  };
  return (
    <>
      <SecondaryHeader />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>Create a post</Text>
            <TextInput
              style={styles.input}
              placeholder={"Add post title"}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />

            <TextInput
              style={styles.input}
              placeholder={"Add post description"}
              multiline={true}
              numberOfLines={10}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            <TouchableOpacity style={styles.btn} onPress={handlePost}>
              <FontAwesome5 name="plus-square" size={18} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 18 }}>
                {loading ? "please wait..." : "Create Post"}
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
  heading: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginVertical: 15,
  },
  input: {
    borderColor: "#a2a2a2",
    borderWidth: 1,
    padding: 6,
    fontSize: 17,
    marginVertical: 15,
    textAlignVertical: "top",
  },
  btn: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});

export default Post;
