import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import PostModel, { Post } from '../Model/PostModel';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import UserModel from '../Model/UserModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostAddPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [imageURI, setImageURI] = useState('');
    const [owner, setOwner] = useState('');
    const [loading, setLoading] = useState(true);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                const token: any = await AsyncStorage.getItem('token');
                if (token) {
                    const user: any = await UserModel.getStudent(token);
                    setOwner(user.data._id);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setLoading(true);
            }
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        requestPermission();
    }, []);

    const takePhoto = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) {
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
                setImageURI(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error selecting an image:', error);
        }
    };

    const onCancel = () => {
        navigation.navigate('PostList');
    };

    const onSaveCallback = async () => {
        const post: Post = {
            title: title,
            message: message,
            owner: owner,
            imgUrl: ''
        };
        try {
            if (imageURI !== '') {
                post.imgUrl = await UserModel.uploadImage(imageURI);
            } else {
                throw new Error('Image URL is required');
            }
            await PostModel.addPost(post);
            navigation.goBack();
        } catch (err) {
            console.log('Error saving post:', err);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imagePicker}>
                {imageURI ? (
                    <Image style={styles.image} source={{ uri: imageURI }} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Ionicons name="image-outline" size={100} color="#ccc" />
                    </View>
                )}
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.iconButton} onPress={takePhoto}>
                        <Ionicons name="camera-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={selectImage}>
                        <Ionicons name="images-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Enter post title"
                placeholderTextColor="#888"
            />
            <TextInput
                style={[styles.input, { height: 100 }]}
                onChangeText={setMessage}
                value={message}
                placeholder="Enter post message"
                placeholderTextColor="#888"
                multiline
            />

            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={onSaveCallback}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
    },
    imagePicker: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
    },
    iconContainer: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    iconButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 50,
    },
    input: {
        height: 40,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f44336',
    },
    saveButton: {
        backgroundColor: '#2196F3',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PostAddPage;
