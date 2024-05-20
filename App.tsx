import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
// import StudentList from './components/StudentList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './components/LogIn';
import StudentDetailsPage from './components/StudentDetailsPage';
import StudentAddPage from './components/StudentAddPage';
import PostAddPage from './components/PostAddPage';
import PostList from './components/PostList';
import Home from './components/Home';
import Registration from './components/Registration';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="StudentList" component={StudentList} /> */}
        <Stack.Screen name="StudentDetailsPage" component={StudentDetailsPage} />
        <Stack.Screen name="StudentAddPage" component={StudentAddPage} />
        <Stack.Screen name="PostList" component={PostList} />
        <Stack.Screen name="PostAddPage" component={PostAddPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
