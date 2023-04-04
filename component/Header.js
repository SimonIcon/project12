import {SafeAreaView,StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import { Dimensions } from 'react-native';
import Countries from './Countries';
import { Avatar, Menu } from 'react-native-paper';
import { AntDesign, Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'





const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const menuWidth= Math.round(screenWidth/2)
const menuHeight= Math.round(screenHeight/2)
const Header = () => {
     const [visible, setVisible] = useState(false);
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.rightHeader}>
            <View style={styles.selectCountry}>
                    <Countries />
            </View>
              <View style={styles.centerHeader}>
                <Text style={styles.logoText}>inclusive news</Text>
            </View>
            <View style={styles.rightHeader}>
                  <Menu
                 visible={visible}
                 onDismiss={() =>setVisible(false)}
                 anchor={() =>(
                <TouchableOpacity onPress={() => setVisible(true)}>
                   <Avatar source={{ uri: "https://randomuser.me/api/portraits/men/35.jpg" }}rounded size={40}/>
                </TouchableOpacity>
                 )
                }
                >
                    <View style={styles.menuContainer}>
                     <View style={styles.navs}>
                         <TouchableOpacity style={styles.menuItem}>
                         <MaterialIcons name="notifications-none" color="black" size={24} />
                         <Text style={styles.text1}>notifications {5}</Text>
                         
                    </TouchableOpacity>
                     <TouchableOpacity style={styles.menuItem}>
                         <AntDesign name="profile" color="black" size={24} />
                         <Text style={styles.text1}>my post</Text>
                    </TouchableOpacity>
                     <TouchableOpacity style={styles.menuItem}>
                         <MaterialIcons name="info-outline" color="black" size={24} />
                         <Text style={styles.text1}>about us</Text>
                    </TouchableOpacity>

                     </View>
                    
                    <View style={styles.info}>
                        <Text style={styles.text12}>Contact me</Text>
                         <View style={styles.myInfo}>
                            <MaterialCommunityIcons name="email-alert-outline" color="black" size={20} />
                            <Text style={styles.text1}>symohdev@22gmail.com</Text>
                         </View>
                         <View   style={styles.myInfo}>
                            <Feather name="phone-call" color="black" size={20} />
                            <Text style={styles.text1}>0702212582</Text>
                         </View>
                         <View   style={styles.myInfo}>
                            <FontAwesome name="whatsapp" color="black" size={20} />
                            <Text style={styles.text1}>0702212582</Text>
                         </View>
                    </View>
                       

                    </View>
          
                    
                </Menu>
            </View>


                 
             </View>
        
         </SafeAreaView>
    
  )
}

export default Header

const styles = StyleSheet.create({
   
    container:{
     flexDirection:"row"
    },
    searchInput:{
        
        backgroundColor:"white",
        width:"50%",
        justifyContent:"center",
        padding:3,
        paddingLeft:20,
        borderRadius:20,
        borderWidth:1,
    },
    
   
    selectCountry:{
     width:"50%",
     borderRadius:15,
    },
    text13:{
        paddingRight:10,
        textTransform:"capitalize",
        fontWeight:"bold",
        
    },
     logoText:{
        color:"black",
        textAlign:"center",
        justifyContent:"center",
        fontSize:20,
        fontWeight:"bold",
        textTransform:"capitalize",
        marginLeft:10,
    },
     menuContainer:{
        justifyContent:"flex-start",
        alignItems:"center",
    },
    menuItem:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        paddingTop:10,
        
    },
    text1:{
        paddingLeft:20,
        textTransform:"capitalize",
        fontWeight:"bold",

    },
    clientDetail:{
        flexDirection:"row",
        marginTop:10,
        justifyContent:"space-between"
    },
    clientImg:{
        justifyContent:"center",
        alignItems:"center"
    },
    text10:{
        textTransform:"capitalize",
        fontSize:12,
        fontWeight:"bold"

    },
    text11:{
        textAlign:"right",
        fontSize:12,
        paddingLeft:8,
    },
    navs:{
        paddingBottom:20,
        borderBottomWidth:5,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        borderBottomColor:"purple"
    },
    myInfo:{
        flexDirection:"row",
        alignItems:"center",
        padding:5
    },
    info:{
        justifyContent:"center"
    },
    text12:{
        marginTop:20,
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold",
        textDecoration:"underline",
        textDecorationColor:"purple"
       
    },
   
    
})