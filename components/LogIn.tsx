import React, { FC, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import StudentApi from '../api/StudentApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    navigation: NavigationProp<any>;
};

const LogIn: FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }
        };
        checkToken();
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Please fill in all fields');
            return;
        }
        try {
            const res: any = await StudentApi.login({ email, password });
            if (res.ok) {
                await AsyncStorage.clear();
                await AsyncStorage.setItem('token', res.data.refreshToken);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                Alert.alert('Log In failed', res.data);
            }
        } catch (error) {
            // Alert.alert('Log In failed', error.message);
        }
    };

    const handleSignUp = () => {
        navigation.navigate('Registration');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>RecipeNet</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
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
        marginBottom: 40,
        color: '#262626',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#fafafa',
        color: '#333',
    },
    button: {
        width: '100%',
        backgroundColor: '#3897f0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupText: {
        color: '#3897f0',
        fontSize: 14,
        marginTop: 20,
    },
});

export default LogIn;
