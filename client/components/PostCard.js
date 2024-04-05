import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import Icon from "react-native-vector-icons/Entypo";

const PostCard = ({ posts }) => {
  return (
    <>
      <View style={styles.postContainer}>
        {posts?.map((post, i) => (
          <View key={i} style={styles.postCard}>
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
                    width: "90%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingRight: 7,
                    backgroundColor: "red",
                    height: 25,
                  }}
                >
                  <Text style={{ fontWeight: 900, fontSize: 16 }}>
                    {post.postedBy.name}
                  </Text>
                  {/* options */}
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 15,
                      alignItems: "center",
                    }}
                  >
                    <Entypo
                      name="dots-three-horizontal"
                      style={{ fontSize: 18 }}
                    />
                    <AntDesign name="close" style={{ fontSize: 22 }} />
                  </View>
                </View>
                {/* post time */}
                <View style={{flexDirection:"row", gap:10}}>
                  <Text>{moment(post.createdAt).fromNow()}</Text>
                  <MaterialIcons name="public" style={{ fontSize: 18 }} />
                </View>
              </View>
            </View>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description}</Text>
          </View>
        ))}
      </View>
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

export default PostCard;
