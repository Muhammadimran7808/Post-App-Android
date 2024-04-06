import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { useAuth } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import Post from "../../screens/Post";
import MyPosts from "../../screens/MyPosts";
import Account from "../../screens/Account";

const ScreenMenu = () => {
  const Stack = createNativeStackNavigator();
  const [state] = useAuth();

  const authenticatedUser = state?.user && state?.token;

  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Full Stack App",
              headerRight: () => <HeaderMenu />,
            }}
          />

          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "back",
              headerRight: () => <HeaderMenu />,
            }}
          />

          <Stack.Screen
            name="MyPosts"
            component={MyPosts}
            options={{
              headerBackTitle: "back",
              headerRight: () => <HeaderMenu />,
            }}
          />

          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "back",
              headerRight: () => <HeaderMenu />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
