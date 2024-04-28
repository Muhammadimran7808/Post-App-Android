import { View, Text, StyleSheet } from "react-native";
import React from "react";

const LoadingSkeleton = () => {
  const count = [1, 2, 3, 4, 5];
  return (
    <View style={styles.LoadingSkeletonContainer}>
      {count.map((item, index) => (
        <View style={styles.LoadingSkeletonCard} key={index}>
          <View style={styles.userContainer}>
            <View style={styles.profilePic}></View>
            <View>
              <View style={styles.userName}></View>
              <View style={styles.date}></View>
            </View>
          </View>

          <View style={styles.postContent}></View>
          <View style={styles.likeCommentShareContainer}>
            <View style={styles.likeCommentShare}></View>
            <View style={styles.likeCommentShare}></View>
            <View style={styles.likeCommentShare}></View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  LoadingSkeletonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  LoadingSkeletonCard: {
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
    padding: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  userName: {
    width: 130,
    height: 18,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  date: {
    width: 50,
    height: 10,
    backgroundColor: "#f0f0f0",
  },

  postContent: {
    width: "100%",
    height: 120,
    backgroundColor: "#f0f0f0",
    marginTop: 20,
  },
  likeCommentShareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  likeCommentShare: {
    width: 50,
    height: 20,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
});
export default LoadingSkeleton;
