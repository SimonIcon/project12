import { Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../DrawerScreens/HomeScreen';
import Notifications from '../DrawerScreens/Notifications';
import AboutUs from '../DrawerScreens/AboutUs';
import Contact from '../DrawerScreens/Contact';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Countries from '../DrawerScreens/Countries';
const currendWidth = Dimensions.get('screen').width;
const drawerWidth = Math.round(currendWidth / 2);
const Drawer = createDrawerNavigator();
const HomeNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          width: "60%",
        },
        headerShown: false,
      }}
      initialRouteName="HomeScreen"

    >
      <Drawer.Screen name='HomeScreen' component={HomeScreen} options={{
        drawerLabel: "home",
        drawerIcon: () => (
          <Ionicons name="home-outline" size={20} color={"black"} />
        ),
        drawerLabelStyle: {
          fontWeight: 'bold',
          color: 'purple',
          fontSize: 16,
          fontWeight: "bold",
          textTransform: "capitalize",
        },
      }} />

      <Drawer.Screen name='notifications' component={Notifications} options={{
        drawerLabel: "notifications",
        drawerIcon: () => (<Ionicons name="notifications-outline" size={20} color={"black"} />),
        drawerLabelStyle: {
          fontWeight: 'bold',
          color: 'purple',
          fontSize: 16,
          fontWeight: "bold",
          textTransform: "capitalize",
        },
      }} />
      <Drawer.Screen name='countries' component={Countries} options={{
        drawerLabel: "countries",
        drawerIcon: () => (<MaterialCommunityIcons name="ski-cross-country" size={20} color="black" />),
        drawerLabelStyle: {
          fontWeight: 'bold',
          color: 'purple',
          fontSize: 16,
          fontWeight: "bold",
          textTransform: "capitalize",
        },
      }} />
      <Drawer.Screen name='aboutUs' component={AboutUs} options={{
        drawerLabel: "about us",
        drawerIcon: () => (<Ionicons name="information-circle-outline" size={20} color={"black"} />),
        drawerLabelStyle: {
          fontWeight: 'bold',
          color: 'purple',
          fontSize: 16,
          fontWeight: "bold",
          textTransform: "capitalize",
        },
      }} />
      <Drawer.Screen name='contactMe' component={Contact} options={{
        drawerLabel: "contact me",
        drawerIcon: () => (<MaterialIcons name="contact-page" size={20} color={"black"} />),
        drawerLabelStyle: {
          fontWeight: 'bold',
          color: 'purple',
          fontSize: 16,
          fontWeight: "bold",
          textTransform: "capitalize",
        },
      }} />

    </Drawer.Navigator>
  )
}

export default HomeNav

const styles = StyleSheet.create({})