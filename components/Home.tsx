import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {FC} from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import PostList from "./PostList";
import { NavigationContainer } from "@react-navigation/native";


type Props = {
    navigation: any;
};

const Tab = createBottomTabNavigator();
const PostListStack = createNativeStackNavigator();


const PostListScreen: FC = () => {  
    return (
        <PostListStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerShown: false,
            }}
        >
            <PostListStack.Screen name="PostList" component={PostList} options={{ title: 'Posts' }} />
        </PostListStack.Navigator>
    );
} 

const Home: FC<Props> = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>RecipeNet</Text>
            <Text style={styles.subtitle}>Home</Text>
            <Tab.Navigator>
                <Tab.Screen name="Posts" component={PostListScreen} />
            </Tab.Navigator>
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