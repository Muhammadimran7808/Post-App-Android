import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [state] = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState({});

  //   get post intial time
  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/all-posts");
      if (data?.success) {
        setPosts(data?.posts);
      } else {
        alert("Some thing went wrong");
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message || error.message);
      setLoading(false);
    }
  };

  // get profile picture
  const getProfilePicture = async () => {
    try {
      const { data } = await axios.get(`/auth/profile-picture`);
      if (data?.success) {
        setProfilePicture(data?.profilePicture);
      } else {
        alert("Some thing went wrong");
      }
    } catch (error) {
      console.log(error.response.data.message || error.message);
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    if (state?.token) {
      getProfilePicture();
    }
  }, [state?.token]);
  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        loading,
        fetchPost,
        profilePicture,
        getProfilePicture,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePost = () => useContext(PostContext);

export { usePost, PostProvider };
