import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import { usePost } from "../context/postContext";

const Home = () => {
  const [posts, setPosts] = usePost();
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.postContainer}>
            <Text style={styles.heading}>All Posts</Text>
            {posts?.map((post) => (
              <View key={post._id}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.description}>{post.description}</Text>
              </View>
            ))}
          </View>
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
  postContainer: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
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
});
export default Home;
