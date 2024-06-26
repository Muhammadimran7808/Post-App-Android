import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigation";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"}/>
      <RootNavigation />
    </NavigationContainer>
  );
}
