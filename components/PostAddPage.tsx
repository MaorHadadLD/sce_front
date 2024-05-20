import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import PostModel, { Post } from '../Model/PostModel';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const PostAddPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [imageURI, setImageURI] = useState('');
    const [owner, setOwner] = useState('');

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    };

    useEffect(() => {
        requestPermission();
    }, []);

    const takePhoto = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) {
                console.log('uri:', result.assets[0].uri);
                setImageURI(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error taking a photo:', error);
        }
    };

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                console.log('uri:', result.assets[0].uri);
                setImageURI(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error selecting an image:', error);
        }
    };

    const onCancel = () => {
        console.log('Cancel');
        navigation.navigate('PostList');
    };

    const onSaveCallback = async () => {
        console.log('Save');
        const post: Post = {
            title: title,
            message: message,
            owner: owner,
            imageUrl: imageURI
        };
        try {
            if (imageURI !== '') {
                const url = await PostModel.uploadImage(imageURI);
                post.imageUrl = url as string;
            }
            PostModel.addPost(post);
        } catch (err) {
            console.log('Error saving post:', err);
        }
        navigation.goBack();
        // PostModel.addPost(post);
        // navigation.navigate('PostList');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.image_picker}>
                {imageURI !== '' ? (
                    <Image style={styles.image} source={{ uri: imageURI }} />
                ) : (
                    <Image style={styles.image} source={require('../assets/avatar_user.png')} />
                )}
                <TouchableOpacity style={styles.image_picker_button} onPress={takePhoto}>
                    <Ionicons name="camera" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.image_button} onPress={selectImage}>
                    <Ionicons name="image" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Enter post title"
            />
            <TextInput
                style={styles.input}
                onChangeText={setMessage}
                value={message}
                placeholder="Enter post message"
                multiline
            />
            <TextInput
                style={styles.input}
                onChangeText={setOwner}
                value={owner}
                placeholder="Enter your name"
            />
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={onCancel}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onSaveCallback}>
                    <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
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
        padding: 10,
    },
});

export default PostAddPage;
