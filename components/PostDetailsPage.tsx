import { StyleSheet, Text, View, Image, Button, StatusBar } from 'react-native';
import React, { FC, useEffect } from 'react';

const PostDetailsPage: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const { post } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: post.title,
            headerRight: () => (
                <Button onPress={() => navigation.navigate('PostAddPage')} title="Edit" />
            ),
        });
    }, [navigation, post]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.avatar} source={require('../assets/avatar_user.png')} />
                <Text style={styles.owner}>{post.owner}</Text>
            </View>
            <Image style={styles.image} source={{ uri: post.imgUrl }} />
            <View style={styles.content}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.message}>{post.message}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
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

export default PostDetailsPage;
