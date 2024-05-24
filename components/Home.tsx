import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Button, StyleSheet, Text, TextInput, View, StatusBar } from "react-native";
import PostList from "./PostList";
import PostDetailsPage from "./PostDetailsPage";
import PostAddPage from "./PostAddPage";
import Profile from "./Profile";
import UserEditPage from "./UserEditPage";
import MyPost from "./MyPost";

type Props = {
    navigation: any;
};

const Tab = createBottomTabNavigator();
const PostListStackScreen = createNativeStackNavigator();
const ProfileStackScreen = createNativeStackNavigator();


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
            <PostListStackScreen.Screen name="MyPost" component={MyPost} options={{ title: 'My Post' }} />
        </PostListStackScreen.Navigator>
    );
}

const ProfileScreen: FC = () => {
    return (
        <ProfileStackScreen.Navigator
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
            <ProfileStackScreen.Screen name="Profile" component={Profile} options={{ title: 'Profile', headerShown: true }} />
            {/* <ProfileStackScreen.Screen
                name="Profile"
                options={{ title: 'Profile' }}
            >
                {(props) => <Profile {...props} navigation={navigator} route={props.route} />}
            </ProfileStackScreen.Screen> */}
            <ProfileStackScreen.Screen name="UserEditPage" component={UserEditPage} options={{ title: 'Edit User' }} />
        </ProfileStackScreen.Navigator>
    );
}





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
                        <Text style={{ color, fontSize: 30 }}>📄</Text>
                    )
                }}
            />
            <Tab.Screen
                name="ProfileUser"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ color, fontSize: 20 }}>👤</Text>
                    )
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