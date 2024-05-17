import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, {FC} from 'react';

const StudentListRow: FC<{name: string, id: string, imagUrl: string}> = ({name, id, imagUrl}) => {
  return (
    <View style={styles.listrow}>
       <Image style={styles.avatar} source={require('./assets/avatar_user.png')}/>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{id}</Text>
    </View>
  );
}

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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black'
  },
  listrow: {
    marginHorizontal: 5,
    flexDirection: 'row',
    elevation: 1,
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },

  
});
