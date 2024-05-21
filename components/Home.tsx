import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {FC} from "react";
import {Button, StyleSheet, Text, TextInput, View, StatusBar} from "react-native";
import PostList from "./PostList";
import PostDetailsPage from "./PostDetailsPage";
import PostAddPage from "./PostAddPage";


type Props = {
    navigation: any;
};

const Tab = createBottomTabNavigator();
const PostListStackScreen = createNativeStackNavigator();
const AddPostStackScreen = createNativeStackNavigator();


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
            <PostListStackScreen.Screen name="PostList" component={PostList} options={{ headerShown: true }} />
            <PostListStackScreen.Screen name="PostAddPage" component={PostAddPage} options={{ title: 'Add Post' }} />
            <PostListStackScreen.Screen name="PostDetailsPage" component={PostDetailsPage} options={{ title: 'Post Details' }} />
        </PostListStackScreen.Navigator>
    );
} 

// const AddPostScreen: FC = () => {
//     return (
//         <AddPostStackScreen.Navigator
//             screenOptions={{
//                 headerStyle: {
//                     backgroundColor: '#f4511e',
//                 },
//                 headerTintColor: '#fff',
//                 headerTitleStyle: {
//                     fontWeight: 'bold',
//                 },
//                 headerTitleAlign: 'center',
//                 headerShown: false,
//             }}
//         >
//             <AddPostStackScreen.Screen name="PostAddPage" component={PostAddPage} options={{ title: 'Add Post' }} />
//         </AddPostStackScreen.Navigator>
//     );
// }





const Home: FC<Props> = () => {
    return (
        <Tab.Navigator>
        <Tab.Screen 
            name="Posts" 
            component={PostListScreen} 
            options={{
                headerShown: false,
                tabBarLabel: 'Posts',
                tabBarIcon: ({ color, size }) => (
                    <Text style={{ color, fontSize: 55 }}>📄</Text>
                )
            }}
        />
        {/* <Tab.Screen 
            name="Add Post" 
            component={AddPostScreen} 
            options={{
                tabBarLabel: 'Add Post',
                tabBarIcon: ({ color, size }) => (
                    <Text style={{ color, fontSize: 55 }}>➕</Text>
                )
            }}
        /> */}
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