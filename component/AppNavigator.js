import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import NewsScreen from '../screens/NewsScreen';
import HomeNav from './HomeNav';
import ProfileScreen from '../screens/ProfileScreen';
import FavoriteScreen from '../screens/FavoriteScreen';





const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        title: false,
        headerShown: false,
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',

      })}

    >
      <Tab.Screen name='Home' component={HomeNav}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home-account" color="black" size={30} />)

        }}


      />
      <Tab.Screen name='allNews' component={NewsScreen}
        options={{
          tabBarLabel: 'all news',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="newspaper-check" color="black" size={30} />)
        }}

      />
      <Tab.Screen name='savedNews' component={FavoriteScreen}
        options={{
          tabBarLabel: 'saved news',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="content-save" size={30} color="black" />)
        }}

      />

      <Tab.Screen name='profile' component={ProfileScreen}
        options={{
          tabBarLabel: 'my profile',
          tabBarIcon: () => (
            <AntDesign name="profile" size={30} color={"black"} />)

        }}

      />

    </Tab.Navigator>



  )
}

export default AppNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})