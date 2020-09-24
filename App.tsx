import React from 'react';
// import Home from './screens/Home'
import Home from './screens/Flist';
import Employee from './screens/CreateEmployee';
import Profile from './screens/Profile';
import { StyleSheet,  View } from 'react-native';
import constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
            title:"HOME",
            headerTintColor:"white",  
            headerStyle:{
              backgroundColor:"#5a95e8"
            }
        }}/>
        <Stack.Screen name="Employee" component={Employee} options={{
            title:"EMPLOYEE",
            headerTintColor:"white",
            headerStyle:{
              backgroundColor:"#5a95e8"
            }
        }}/>
        <Stack.Screen name="Profile" component={Profile} options={{
            title:"PROFILE",
            headerTintColor:"white",
            headerStyle:{
              backgroundColor:"#5a95e8"
            }
        }}/>
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer><App /></NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
    marginTop: constants.statusBarHeight
  },
});