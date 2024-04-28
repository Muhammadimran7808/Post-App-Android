import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SecondaryHeader from "../components/Menus/SecondaryHeader";
import axios from "axios";
import PostCard from "../components/PostCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

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
      alert(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <>
      <SecondaryHeader />
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <PostCard
              posts={posts}
              myPostFlag={true}
              getUserPosts={getUserPosts}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "lightgray",
  },
});

export default MyPosts;
