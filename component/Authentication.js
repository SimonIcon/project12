import { StyleSheet, SafeAreaView,Text} from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SignInComponent from './SignInComponent';
import SignUpComponent from './SignUpComponent';

const Tab = createMaterialTopTabNavigator();


const Authentication = () => {
  return (
    <SafeAreaView style={styles.container}>
    <Tab.Navigator 
         screenOptions={{
          tabBarLabelStyle: { fontSize: 15 ,textTransform:"capitalize",fontWeight:"bold"},
          tabBarItemStyle: { width: 100 },
         tabBarStyle: { backgroundColor: 'powderblue',justifyContent:"space-between", },
       }}

    
    >
      <Tab.Screen name="signIn" component={SignInComponent} options={{tabBarLabel:"sign in"}} />
      <Tab.Screen name="signUp" component={SignUpComponent} options={{tabBarLabel:"sign up"}}/>
    </Tab.Navigator>
    

    </SafeAreaView>
  )
}

export default Authentication

const styles = StyleSheet.create({
    container:{
        width:"80%",
        height:"80%",
        top:"10%",
        left:"10%",
        padding:5,
    }
})