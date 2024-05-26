import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Button, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import StudentApi from '../api/StudentApi';
import UserModel from '../Model/UserModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      console.log('focus');
      try {
        const token: any = await AsyncStorage.getItem('token');
        if (token) {
          const user: any = await UserModel.getStudent(token);
          
          setData(user.data);
         
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('UserEditPage')}
          title="Edit Profile"
        />
      ),
    });
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    );
  }

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('LogIn');
      await StudentApi.logout(data._id);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          {data.imgUrl !== '' ? (
            <Image style={styles.avatar} source={{ uri: data.imgUrl }} />
          ) : (
            <Image style={styles.avatar} source={require('../assets/avatar_user.png')} />
          )}
        </View>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.email}>{data.email}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 20,
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#3897f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#e1306c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
