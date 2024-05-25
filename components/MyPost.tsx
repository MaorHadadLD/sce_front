import PostList from './PostList';
import PostAddPage from './PostAddPage';
import PostDetailsPage from './PostDetailsPage';
import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StatusBar, View, StyleSheet } from 'react-native';
import PostModel, { Post } from '../Model/PostModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserModel from '../Model/UserModel';
import PostListRow from './PostListRow';




const MyPost: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('focus');
            let posts: Post[] = [];
            try {
                const token: any = await AsyncStorage.getItem('token');
                const user: any = await UserModel.getStudent(token);
                if (token) {
                    posts = await PostModel.getPostByOwner(user.data._id);
                    console.log("Posts", posts);
                    setData(posts);
                    console.log("Data", data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
                setLoading(false);
            }
        });
        return unsubscribe;
    }, [navigation]);

    if (loading) {
        return (
            <ActivityIndicator size="large" color="#0000ff" />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item._id ?? ''}
                renderItem={({ item }) => (
                    <PostListRow
                        title={item.title}
                        message={item.message}
                        owner={item.owner}
                        imgUrl={item.imgUrl}
                        _id={item._id ?? ''}
                        onItemSelected={(post) => navigation.navigate('PostDetailsPage', { post })}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
    },
    contentContainer: {
        alignItems: 'center',
    },
});

export default MyPost;