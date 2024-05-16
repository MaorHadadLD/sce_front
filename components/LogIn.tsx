import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Add your login logic here
        console.log('Login with', { email, password });
    };

    const handleSignUp = () => {
        // Add your sign up logic here
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
}

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
