import * as ImagePicker from 'expo-image-picker';
import React, { FC, useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import UserModel, { User } from '../Model/UserModel';
import { Ionicons } from '@expo/vector-icons';
import StudentApi from '../api/StudentApi';

const Registration: FC<{ navigation: any }> = ({ navigation }) => {
    const [name, onInitName] = useState('');
    const [id, onInitId] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [imageURI, setImageURI] = useState('');
    const [age, setAge] = useState("");

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
                setImageURI(result.assets[0].uri);
            }
        } catch (error) {
            console.log("Error reading an image", error);
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

    const validatePassword = (password: string) => {
        const hasLetters = /[a-zA-Z]/.test(password);
        const hasDigits = /[0-9]/.test(password);
        return password.length >= 6 && hasLetters && hasDigits;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onCancel = () => {
        navigation.navigate('LogIn');
    };

    const onSave = async () => {
        if (!validatePassword(password)) {
            Alert.alert('Invalid Password', 'Password must be at least 6 characters long and contain both letters and digits.');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        const user: User = {
            name: name,
            id: id,
            imgUrl: image ?? '',
            email: email, 
            password: password,
        };
        user.imgUrl = await UserModel.uploadImage(imageURI);
        await StudentApi.register(user);
        navigation.navigate('LogIn');
    };

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.imagePicker}>
                {imageURI ? (
                    <Image style={styles.image} source={{ uri: imageURI }} />
                ) : (
                    <Image style={styles.image} source={require('../assets/avatar_user.png')} />
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
                onChangeText={onInitName}
                value={name}
                placeholder="Enter your name"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter your email"
                placeholderTextColor="#888"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Enter your password"
                placeholderTextColor="#888"
                secureTextEntry
            />
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                    <Ionicons name="close-circle-outline" size={24} color="white" />
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={onSave}>
                    <Ionicons name="checkmark-circle-outline" size={24} color="white" />
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    imagePicker: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
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
        width: '80%',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 20,
        width: '80%',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
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
        marginLeft: 5,
        fontWeight: 'bold',
    },
});

export default Registration;
