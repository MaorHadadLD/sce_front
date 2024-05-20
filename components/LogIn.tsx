import React, { FC, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import apiClient from '../api/Client';  // Ensure this path is correct
import StudentModel from '../Model/StudentModel';
import StudentApi from '../api/StudentApi';

type Props = {
    navigation: NavigationProp<any>;
};

const LogIn: FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        console.log('Log In');
       try {
            const res = StudentApi.login({ email, password });
            console.log('Log In successful', res);
            navigation.navigate('Home');
       }
         catch (error) {
                console.log('Log In failed');
                Alert.alert('Log In failed');
         }
    }

    const handleSignUp = () => {
        navigation.navigate('Registration');
        console.log('Navigate to Sign Up Page');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>RecipeNet</Text>
            <Text style={styles.subtitle}>Log In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#888"
            />
            <View style={styles.buttonContainer}>
                <Button title="Log In" onPress={handleLogin} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Sign Up" onPress={handleSignUp} />
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        color: '#333',
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 10,
    },
});

export default LogIn;
