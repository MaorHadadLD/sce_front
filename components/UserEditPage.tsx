import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar, ScrollView, TouchableHighlight } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import UserModel, { User } from '../Model/UserModel';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


const UserEditPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [name, onChangeName] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [image, setImage] = React.useState('');
    const [imageURI, setImageURI] = useState('');

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

    const onCancel = () => {
        console.log('Cancel');
        navigation.goBack()
    }
    const onSave = () => {
        const user: User = {
            name: name,
            imgUrl: image ?? '',
            email: '',
            password: '',
        };
        UserModel.addStudent(user);
        navigation.navigate('ProfileUser');
    }
    return (
        <ScrollView style={styles.container}>
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
                onChangeText={onChangeName}
                value={name}
                placeholder="Enter your name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Enter your email"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Enter your address"
            />
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={onCancel}>
                    <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onSave}>
                    <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'blue',
    },
    avatar: {
        alignSelf: 'center',
        height: 200,
        width: 200,
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
        padding: 10
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


export default UserEditPage;