import * as ImagePicker from 'expo-image-picker';
import React, { FC, useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import StudentModel, { Student } from '../Model/StudentModel';
import { Ionicons } from '@expo/vector-icons';


const Registr: FC<{ navigation: any }> = ({ navigation }) => {

    const [name, onInitName] = React.useState('');
    const [id, onInitId] = React.useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [imageURI, setImageURI] = useState("");

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }

    useEffect(() => {
        requestPermission();
    }, []);

    const takePhoto = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync()
            if (!result.canceled) {
                console.log("uri:" + result.assets[0].uri)
                setImageURI(result.assets[0].uri)
            }
        } catch (error) {
            console.log("Error reading an image")
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
        navigation.navigate('LogIn');
    }

    const onSave = () => {
        console.log('Save');
        const student: Student = {
            name: name,
            id: id,
            imgUrl: image ?? ''
        }
        StudentModel.addStudent(student);
        navigation.navigate('StudentList');
    }

    return (
        <View style={styles.container}>
            <View style={styles.image_picker}>
                {imageURI != "" && <Image style={styles.image} source={{ uri: imageURI }} />}
                {imageURI == "" && <Image style={styles.image} source={require('../assets/avatar_user.png')} />}
                <TouchableHighlight style={styles.image_picker_button}
                 onPress={takePhoto} >
                    <Ionicons name="camera" size={24} color="black" />
                </TouchableHighlight>
                <TouchableHighlight style={styles.image_button}
                 onPress={selectImage} >
                    <Ionicons name="image" size={24} color="black" />
                </TouchableHighlight>
            </View>
    
            <TextInput
                style={styles.input}
                onChangeText={onInitName}
                value={name}
                placeholder="Enter your name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onInitId}
                value={id}
                placeholder="Enter your id"
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        flexDirection: 'column',
        alignItems: 'center',
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
    image_picker: {
        height: 250,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
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

export default Registr;

