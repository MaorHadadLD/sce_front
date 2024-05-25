import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserModel from '../Model/UserModel';
import StudentApi from '../api/StudentApi';

const PostListRow: FC<{
    title: string,
    message: string,
    owner: string,
    imgUrl: string,
    _id: string,
    onItemSelected: (post: { _id: string, title: string, message: string, owner: string, imgUrl: string }) => void
}> = ({ title, message, owner, imgUrl, _id, onItemSelected }) => {
    const onPress = () => {
        onItemSelected({ _id, title, message, owner, imgUrl });
    }

    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       const fetchUserData = async () => {
          try {
           
            const user: any = await StudentApi.getStudentById(owner);
           
            if (user) { 
              
              setData(user.data);
             
              setLoading(false);
            }
          } catch (error) {
            console.error('Failed to fetch user:', error);
            setLoading(true);
          }
        };
        fetchUserData();
        }, [data]); 
     
      
    return (
        <TouchableHighlight onPress={onPress} underlayColor={'#DDDDDD'}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.avatar} source={require('../assets/avatar_user.png')} />
                    <Text style={styles.owner}>{owner}</Text>
                </View>
                <Image style={styles.image} source={{ uri: imgUrl }} />
                <View style={styles.content}> 
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    owner: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 300,
    },
    content: {
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    message: {
        fontSize: 16,
        color: '#444',
    },
});

export default PostListRow;
