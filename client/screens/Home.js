import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import SecondaryHeader from "../components/Menus/SecondaryHeader";
import { usePost } from "../context/postContext";
import PostCard from "../components/PostCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

const Home = () => {
  const {posts, loading, fetchPost} = usePost();
  const [refreshing, setRefreshing] = useState(false);

  // pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPost();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <SecondaryHeader />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          {loading ? <LoadingSkeleton/> : <PostCard posts={posts} />}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
  },
});

export default Home;
