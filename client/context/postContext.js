import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  //   get post intial time
  const fetchPost = async () => {
    try {
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

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {children}
    </PostContext.Provider>
  );
};

const usePost = () => useContext(PostContext);

export { usePost, PostProvider };
