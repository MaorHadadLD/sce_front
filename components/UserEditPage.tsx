import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserModel, { User } from '../Model/UserModel';

const UserEditPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageURI, setImageURI] = useState('');
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');

    const fetchUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const user = await UserModel.getStudent(token);
                setName(user.data.name);
                setEmail(user.data.email);
                setPassword(user.data.password);
                setImageURI(user.data.imgUrl);
                setId(user.data._id);
                setLoading(false);
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchUserData);
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const requestPermission = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        };
        requestPermission();
    }, []);

    const takePhoto = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync();
            if (!result.cancelled) {
                setImageURI(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error taking a photo:", error);
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
            if (!result.cancelled) {
                setImageURI(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error selecting an image:', error);
        }
    };

    const onCancel = () => {
        navigation.goBack();
    };

    const onSave = () => {
        const user: User = {
            name: name,
            imgUrl: imageURI ?? '',
            email: email,
            id: id,
            password: password,
        };
        console.log('user:', user);
        UserModel.updateStudent(user);
        navigation.navigate('Profile');
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                {imageURI ? (
                    <Image style={styles.avatar} source={{ uri: imageURI }} />
                ) : (
                    <Image style={styles.avatar} source={require('../assets/avatar_user.png')} />
                )}
                <TouchableOpacity style={styles.cameraIcon} onPress={takePhoto}>
                    <Ionicons name="camera" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageIcon} onPress={selectImage}>
                    <Ionicons name="image" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                    <Text style={[styles.buttonText, { color: '#fff' }]}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: StatusBar.currentHeight || 20,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
    },
    imageIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
    },
    input: {
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#3897f0',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default UserEditPage;
