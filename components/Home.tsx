import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {FC} from "react";
import {Button, StyleSheet, Text, TextInput, View, StatusBar} from "react-native";
import PostList from "./PostList";
import PostDetailsPage from "./PostDetailsPage";



type Props = {
    navigation: any;
};

const Tab = createBottomTabNavigator();
const PostListStackScreen = createNativeStackNavigator();


const PostListScreen: FC = () => {  
    return (
        <PostListStackScreen.Navigator
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
            <PostListStackScreen.Screen name="PostList" component={PostList} options={{ title: 'Posts' }} />
            <PostListStackScreen.Screen name="PostDetailsPage" component={PostDetailsPage} options={{ title: 'Post Details' }} />
        </PostListStackScreen.Navigator>
    );
} 

// const TabNavigator: FC = () => {
//     return (
//         <Tab.Navigator>
//             <Tab.Screen 
//                 name="Posts" 
//                 component={PostListScreen} 
//                 options={{
//                     tabBarLabel: 'Posts',
//                     tabBarIcon: ({ color, size }) => (
//                         <Text style={{ color, fontSize: size }}>📄</Text>
//                     ),
//                 }}
//             />
//         </Tab.Navigator>
//     );
// }   

const Home: FC<Props> = () => {
    return (
        <Tab.Navigator>
        <Tab.Screen 
            name="Posts" 
            component={PostListScreen} 
            options={{
                tabBarLabel: 'Posts',
                tabBarIcon: ({ color, size }) => (
                    <Text style={{ color, fontSize: size }}>📄</Text>
                ),
            }}
        />
    </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
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