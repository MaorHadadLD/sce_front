import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import PostModel from '../Model/PostModel';
import PostApi from '../api/PostApi'


const PostDetailsPage: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    console.log("PostDetailsPage",route.params._id);
    const post = PostModel.getPost(route.params._id);
    console.log("PostDetailsPage22",post);
    console.log("PosrWhere",post);
    useEffect(() => {
        navigation.setOptions({
            title: post?.title,
            
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('PostAddPage')}
                    title="Edit"
                />
            ),
            
        })
    }, [])

    



    return (
        <View style={styles.container}>
            {/* <Image style={styles.avatar} source={require('../assets/avatar_user.png')} /> */}
            <Text style={styles.input}>{post?.title}</Text>
            <Text style={styles.input}>{post?.message}</Text>
            <Text style={styles.input}>{post?.owner}</Text>
            <Image style={styles.avatar} source={{ uri: post?.imgUrl }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'blue',
    },
    avatar: {
        alignSelf: 'center',
        height: 200,
        width: 200,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'black',
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
        padding: 10
    }

});

export default PostDetailsPage;