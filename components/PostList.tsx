import { FC, useEffect, useState } from "react";
import { FlatList, Text, StyleSheet, View, Image, Button } from "react-native";
import PostModel, { Post } from "../Model/PostModel";
import PostListRow from "./PostListRow";
import PostDetailsPage from "./PostDetailsPage";
import { on } from "form-data";

const PostList: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Post[]>([]);
    

    const onItemSelected = (_id: string) => {
        console.log('Item selectedNOmen: ' + _id);
        navigation.navigate('PostDetailsPage', { _id: _id });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('focus');
            // setData([...PostModel.getPost()]);
            let posts: Post[] = [];
            try {
                posts = await PostModel.getAllPosts();
                console.log("postsXX: " + posts.map((post) => post._id));
                setData(posts);
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
        navigation.setOptions({
            headerLeft: () => (
                <Button
                    onPress={() => navigation.navigate('MyPost')}
                    title="My Post"
                />
            ),
        })
    }, [])

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
