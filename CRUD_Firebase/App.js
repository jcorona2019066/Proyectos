import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Chat from './screens/Chat';
import Home from './screens/Home';
import Add from './screens/Add';
import { Entypo } from '@expo/vector-icons';
import colors from './colors';

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});
const Tab = createBottomTabNavigator();


const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};



function HomeStackScreen() {
  return (
    <Stack.Navigator >
      <Stack.Screen name='Home'  component={Home} />
      <Stack.Screen name='Add'  component={Add} />
      
    </Stack.Navigator>
  );
}


function ChatScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Chat' component={Chat} />
      
    </Stack.Navigator>
  );
}


function Tabs() {
  return (

      <Tab.Navigator defaultScreenOptions={HomeStackScreen}  
      
          screenOptions={({ route }) => ({
            tabBarIcon: ({color, size }) => {
              if (route.name === 'Home') {
                return (
                  <Entypo name="home" size={size} color={color}/>
                );
              } if (route.name === 'Chat') {
                return (
                  <Entypo name="chat" size={size} color={color}/>
                );
              }if (route.name === 'Add') {
                return (
                  <Entypo name="add-to-list" size={size} color={color}/>
                );
              }
            },
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: 'tomato',
            headerShown: false,
          })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        
        <Tab.Screen name="Chat" component={ChatScreen}  />
        
        
      </Tab.Navigator>

  );
}


/* function Views(){
  return (
  <Stack.Navigator>
    <Stack.Screen name='Add'  component={Add} options={{presentation: 'modal'}}/>
  </Stack.Navigator>
  )
  
} */

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
// unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

return (
    <NavigationContainer>
      {user ? (
        <>
          <Tabs />
          
        </>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}

