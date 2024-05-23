import * as ImagePicker from 'expo-image-picker';
import React, { FC, useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, TextInput, TouchableHighlight, View } from 'react-native';
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
                console.log("uri:" + result.assets[0].uri);
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
                console.log('uri:', result.assets[0].uri);
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
        console.log('Cancel');
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

        console.log('Save');
        const user: User = {
            name: name,
            id: id,
            imgUrl: image ?? '',
            email: email, 
            password: password,
        };
       user.imgUrl= await UserModel.uploadImage(imageURI);
       console.log("userImageBar", user.imgUrl);
         await StudentApi.register(user);
        navigation.navigate('LogIn');
    };

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.image_picker}>
                {imageURI !== '' ? (
                    <Image style={styles.image} source={{ uri: imageURI }} />
                ) : (
                    <Image style={styles.image} source={require('../assets/avatar_user.png')} />
                )}
                <TouchableHighlight style={styles.image_picker_button} onPress={takePhoto}>
                    <Ionicons name="camera" size={24} color="black" />
                </TouchableHighlight>
                <TouchableHighlight style={styles.image_button} onPress={selectImage}>
                    <Ionicons name="image" size={24} color="black" />
                </TouchableHighlight>
            </View>

            <TextInput
                style={styles.input}
                onChangeText={onInitName}
                value={name}
                placeholder="Enter your name"
            />
            {/* <TextInput
                style={styles.input}
                onChangeText={onInitId}
                value={id}
                placeholder="Enter your ID"
            /> */}
            {/* <TextInput
                style={styles.input}
                onChangeText={setAge}
                value={age.toString()}
                placeholder="Enter your age"
                keyboardType="numeric"
            /> */}
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter your email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Enter your password"
                secureTextEntry
            />
            <View style={styles.buttons}>
                <Button title="Cancel" onPress={onCancel} />
                <Button title="Save" onPress={onSave} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        marginTop: 50,
        flexDirection: 'column',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 20,
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
});

export default Registration;
