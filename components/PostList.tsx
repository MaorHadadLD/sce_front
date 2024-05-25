import { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Button } from "react-native";
import PostModel, { Post } from "../Model/PostModel";
import PostListRow from "./PostListRow";

const PostList: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Post[]>([]);

    const onItemSelected = (post: Post) => {
        navigation.navigate('PostDetailsPage', { post });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            let posts: Post[] = [];
            try {
                posts = await PostModel.getAllPosts();
                setData(posts);
            } catch (err) {
                console.log("Failed to fetch posts: " + err);
            }
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => navigation.navigate('PostAddPage')} title="Add Post" />
            ),
            headerLeft: () => (
                <Button onPress={() => navigation.navigate('MyPost')} title="My Post" />
            ),
        });
    }, [navigation]);

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
                        onItemSelected={onItemSelected}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default PostList;
