import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar, TouchableHighlight } from 'react-native';
import React, { useState, FC } from 'react';



const PostListRow: FC<{
    title: string,
    message: string,
    owner: string
    imageUrl: string
    onItemSelected: (title: string) => void
}> = ({ title,message, owner, imageUrl, onItemSelected }) => {
    const onPress = () => {
        onItemSelected(title);
    }
    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor={'grey'}>
            <View style={styles.listrow}>
                <Image style={styles.avatar} source={require('../assets/avatar_user.png')} />
                <View style={styles.info}>
                    <Text style={styles.name}>{title}</Text>
                    <Text style={styles.id}>{message}</Text>
                    <Text style={styles.id}>{imageUrl}</Text>
                    <Text style={styles.id}>{owner}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    listrow: {
        marginHorizontal: 5,
        marginVertical: 1,
        flexDirection: 'row',
        elevation: 1,
        borderRadius: 2
    },
    avatar: {
        margin: 10,
        height: 100,
        width: 100
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    name: {
        marginBottom: 5,
        fontSize: 25,
        fontWeight: 'bold'
    },
    id: {
        marginBottom: 5,
        fontSize: 20
    }
});

export default PostListRow;