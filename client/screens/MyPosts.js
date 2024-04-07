import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";
import PostCard from "../components/PostCard";

const MyPosts = () => {
  // local states
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // get user post
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/user-posts");
      setPosts(data?.userPosts);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            <Text style={{ textAlign: "center", marginTop: 250, fontSize: 20 }}>
              Loading...
            </Text>
          ) : (
            <PostCard posts={posts} myPost={true}/>
          )}
        </View>
      </ScrollView>
      <FooterMenu />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 10,
  },
});

export default MyPosts;
