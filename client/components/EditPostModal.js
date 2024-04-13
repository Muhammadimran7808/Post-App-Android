import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Model from "react-native-modal";

const EditPostModal = ({ editModalVisible, setEditModalVisible, post }) => {
  // local state
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // toggle model
  const toggleModal = () => {
    setEditModalVisible(!editModalVisible);
  };

  useEffect(() => {
    setTitle(post?.title);
    setDescription(post?.description);
  }, [post]);

  return (
    <View>
      <Model
        isVisible={editModalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => toggleModal()}
        hideModalContentWhileAnimating={true}
        backdropOpacity={0.2}
        style={{ margin: 0 }}
      >
        <View style={{ backgroundColor: "white", padding: 20 }}>
          <View>
            <Text style={styles.heading}>Update post</Text>
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
              numberOfLines={8}
              value={description}
              onChangeText={ (text) => setDescription(text)}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.btn} onPress={""}>
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  {loading ? "please wait..." : "Update Post"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "red" }]}
                onPress={toggleModal}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Model>
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});

export default EditPostModal;
