import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';



export default function StudentAddPage() {
  const [name, onChangeName] = React.useState('');
  const [id, onChangeId] = React.useState('');
  const [address, onChangeAddress] = React.useState('');

  const onCancel = () => {
    onChangeName('');
    onChangeId('');
    onChangeAddress('');
  }

  const onSave = () => {
    console.log('Name: ', name);
    console.log('Id: ', id);
    console.log('Address: ', address);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={require('./assets/avatar_user.png')} />
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Enter your name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeId}
        value={id}
        placeholder="Enter your id number"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeAddress}
        value={address}
        placeholder="Enter your address"
      />
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      </View>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: { 
    padding: 10,
  }
  
});
