import { StyleSheet, Text, View, Image, Button, StatusBar, TouchableHighlight, ActivityIndicator } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import StudentApi from '../api/StudentApi';

const PostDetailsPage: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const { post } = route.params;
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await StudentApi.getStudentById(post.owner);
                if (userResponse) {
                    setUser(userResponse.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setLoading(false); // Set loading to false in case of error to avoid indefinite loading state
            }
        };
        fetchUserData();

        navigation.setOptions({
            title: post.title,
            headerRight: () => (
                <Button onPress={() => navigation.navigate('PostAddPage')} title="Edit" />
            ),
        });
    }, [navigation, post]);

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.backButton} onPress={() => navigation.goBack()} underlayColor={'#DDDDDD'}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableHighlight>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <View style={styles.header}>
                        <Image style={styles.avatar} source={user && user.avatarUrl ? { uri: user.avatarUrl } : require('../assets/avatar_user.png')} />
                        <Text style={styles.owner}>{user ? user.name : 'Unknown'}</Text>
                    </View>
                    <Image style={styles.image} source={{ uri: post.imgUrl }} />
                    <View style={styles.content}>
                        <Text style={styles.title}>{post.title}</Text>
                        <Text style={styles.message}>{post.message}</Text>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
    },
    backButton: {
        padding: 10,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
        alignSelf: 'flex-start',
        margin: 10,
    },
    backButtonText: {
        color: '#000',
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
