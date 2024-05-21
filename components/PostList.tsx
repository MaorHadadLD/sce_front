import { FC, useEffect, useState } from "react";
import { FlatList, Text, StyleSheet, View, Image, Button } from "react-native";
import PostModel, { Post } from "../Model/PostModel";
import PostListRow from "./PostListRow";
import PostDetailsPage from "./PostDetailsPage";
import { on } from "form-data";

const PostList: FC<{ navigation: any }> = ({ navigation }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    

    const onItemSelected = (title: string) => {
        console.log('Item selected: ' + title);
        navigation.navigate('PostDetailsPage', { title: title });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('focus');
            let posts: Post[] = [];
            try {
                posts = await PostModel.getAllPosts();
                setPosts(posts);
            } catch (err) {
                console.log("fail fetching post " + err)
                }
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('PostAddPage')}
                    title="Add"
                />
            ),
        })
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <PostListRow
                        title={item.title}
                        message={item.message}
                        owner={item.owner}
                        imageUrl={item.imageUrl}
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
    postContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 1,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    message: {
        fontSize: 16,
        marginVertical: 4,
    },
    owner: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'gray',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 8,
    },
});

export default PostList;
