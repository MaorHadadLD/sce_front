import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import StudentListRow from './components/StudentListRow';


export default function App() {

  return (
    <View style={styles.container}>
      <StudentListRow name="John Doe" id="123456" imagUrl="./assets/avatar_user.png"/>
      </View>
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
