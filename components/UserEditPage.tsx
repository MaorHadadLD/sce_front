import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ScrollView,
    TouchableHighlight,
    ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, FC } from 'react';
import UserModel, { User } from '../Model/UserModel';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            if (!result.canceled) {
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
            if (!result.canceled) {
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
        <ScrollView style={styles.container}>
            <View style={styles.image_picker}>
            {imageURI !== '' ? (
                    <Image style={styles.image} source={{ uri: imageURI }} />
                ) : (
                    <Image style={styles.image} source={{uri: imageURI}} />
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
};

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
        padding: 10,
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
