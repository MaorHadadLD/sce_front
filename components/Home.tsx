import React, {FC} from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";

type Props = {
    navigation: any;
};

const Home: FC<Props> = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>RecipeNet</Text>
            <Text style={styles.subtitle}>Home</Text>
            <View style={styles.buttonContainer}>
                <Button title="Student list" onPress={() => navigation.navigate("StudentList")} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Post" onPress={() => navigation.navigate("PostList")} />
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 16,
    },
    buttonContainer: {
        margin: 8,
    },
});

export default Home;