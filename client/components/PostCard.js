import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Model from "react-native-modal";
import axios from "axios";
import moment from "moment";

const PostCard = ({ posts, myPost, getUserPosts }) => {
  // local state
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // toggle model
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // #region delete prompt
  const deletePrompt = (id) => {
    Alert.alert(
      "Delete Post?",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "OK",
          onPress: () => {
            handleDeletePost(id);
          },
        },
      ],
      { cancelable: false }
    );
  };
  // #endregion
  //#region delete post
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      alert(data?.message);
      getUserPosts();
      setLoading(false);
      toggleModal();
    } catch (error) {
      console.error(error);
      alert(error);
      setLoading(false);
    }
  };
  //#endregion

  return (
    <>
      <View style={styles.postContainer}>
        {posts?.map((post, i) => (
          <View key={i} style={styles.postCard}>
            {/* user details like name and post upload time */}
            <View style={styles.user}>
              <Image
                style={{ width: 35, height: 35 }}
                source={{
                  uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
                }}
              />
              <View>
                {/* name and option */}
                <View
                  style={{
                    width: "93%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingRight: 7,
                    // backgroundColor: "red",
                    height: 25,
                  }}
                >
                  <Text style={{ fontWeight: 900, fontSize: 16 }}>
                    {post.postedBy.name}
                  </Text>
                  {/* 3 dot and cross */}
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 15,
                      alignItems: "center",
                    }}
                  >
                    {/* this dots show only on user's own post */}
                    {myPost && (
                      <TouchableOpacity onPress={toggleModal}>
                        <Entypo
                          name="dots-three-horizontal"
                          style={{ fontSize: 22 }}
                        />
                        <Model
                          isVisible={isModalVisible}
                          onSwipeComplete={() => toggleModal()}
                          swipeDirection="down"
                          onBackdropPress={() => toggleModal()}
                          hideModalContentWhileAnimating={true}
                          backdropOpacity={0.1}
                          style={{ margin: 0 }}
                        >
                          <View style={styles.modelContainer}>
                            {/*Model Options*/}
                            <View style={styles.modelContent}>
                              {/* ----------edit post--------- */}
                              <TouchableOpacity style={styles.modelOptions} >
                                <AntDesign
                                  name="edit"
                                  style={{ fontSize: 22 }}
                                />
                                <Text style={{ fontSize: 16 }}>Edit</Text>
                              </TouchableOpacity>
                              {/* --------delete post---------- */}
                              <TouchableOpacity
                                style={styles.modelOptions}
                                onPress={() => {
                                  deletePrompt(post._id);
                                  // console.log(post._id);
                                }}
                              >
                                <AntDesign
                                  name="delete"
                                  style={{ fontSize: 22 }}
                                />
                                <View>
                                  <Text style={{ fontSize: 16 }}>Delete</Text>
                                  <Text style={{ fontSize: 12, color: "gray" }}>
                                    This will delete your post permanently
                                  </Text>
                                </View>
                              </TouchableOpacity>
                              {/* ---------pin post--------- */}
                              <TouchableOpacity style={styles.modelOptions}>
                                <AntDesign
                                  name="pushpino"
                                  style={{ fontSize: 22 }}
                                />
                                <Text style={{ fontSize: 16 }}>Pin post</Text>
                              </TouchableOpacity>
                              {/* save post */}
                              <TouchableOpacity style={styles.modelOptions}>
                                <AntDesign
                                  name="save"
                                  style={{ fontSize: 22 }}
                                />
                                <View>
                                  <Text style={{ fontSize: 16 }}>
                                    Save post
                                  </Text>
                                  <Text style={{ fontSize: 12, color: "gray" }}>
                                    Add this to your saved items
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Model>
                      </TouchableOpacity>
                    )}

                    <AntDesign name="close" style={{ fontSize: 22 }} />
                  </View>
                </View>
                {/* post time */}
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <Text>{moment(post.createdAt).fromNow()}</Text>
                  <MaterialIcons name="public" style={{ fontSize: 18 }} />
                </View>
              </View>
            </View>
            {/* post content */}
            <View
              style={{
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: "lightgray",
              }}
            >
              <Text style={styles.description}>{post.description}</Text>
            </View>
            {/* like comment and share */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <AntDesign name="like2" style={{ fontSize: 22 }} />
                <Text>Like</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <AntDesign name="message1" style={{ fontSize: 22 }} />
                <Text>Comment</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <AntDesign name="sharealt" style={{ fontSize: 22 }} />
                <Text>Share</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      {/* loading */}
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 24 }}>Please wait...</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    paddingTop: 10,
  },
  postCard: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginVertical: 4,
  },
  user: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 5,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  modelContainer: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 400,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modelContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    height: "100%",
  },
  modelOptions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default PostCard;
