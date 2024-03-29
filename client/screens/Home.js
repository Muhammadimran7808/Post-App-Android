import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../context/authContext'

const Home = () => {
  const [state] = useAuth();
  return (
    <View>
      <Text>Home</Text>
      <Text>{JSON.stringify(state,null,4)}</Text>
    </View>
  );
}

export default Home