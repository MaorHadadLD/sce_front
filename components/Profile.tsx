import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Button, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import StudentApi from '../api/StudentApi';
import UserModel, {User} from '../Model/UserModel';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Profile: FC<{route: any,navigation: any }> = ({  route ,navigation }) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
        console.log('focus');
        
        try {
            const token: any = await AsyncStorage.getItem('token');
            if(token){
             const user: any = await UserModel.getStudent(token);
            console.log("UserProfile",user);
            setData(user.data);
            console.log("Data",data);
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
    })
}, [])




  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    );
  }

  

  return (
    <View style={styles.container}>
     <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.image_picker}>
                {data.imgUrl !== '' ? (
                    <Image style={styles.image} source={{ uri: data.imgUrl }} />
                ) : (
                    <Image style={styles.image} source={require('../assets/avatar_user.png')} />
                )}
            </View>
            <Text style={styles.input}> 
              {data.name}
            </Text>
            <Text style={styles.input}>
              {data.email}
            </Text>
            
        </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  image_picker: {
    height: 250,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
},
image: {
    width: 100,
    height: 250,
    resizeMode: 'contain',
},
image_picker_button: {
    position: 'absolute',
    bottom: 10,
    left: 5,
},
image_button: {
    position: 'absolute',
    bottom: 10,
    right: 5,
},
contentContainer: {
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
});

export default Profile;
