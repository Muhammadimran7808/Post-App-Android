import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

// context
const AuthContext = createContext();

// provider
const AuthProvider = ({ children }) => {
  // global state
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  //get intial local storage data
  useEffect(() => {
    const getLocalStorageData = async () => {
      const data = await AsyncStorage.getItem("@auth");
      if (data) {
        const parseData = JSON.parse(data);
        setState({ ...state, user: parseData?.user, token: parseData?.token });
      }
    };
    getLocalStorageData();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
