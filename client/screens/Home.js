import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import { usePost } from "../context/postContext";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = usePost();
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <PostCard posts={posts} />
        </View>
      </ScrollView>
      <FooterMenu />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
  },
});

export default Home;
