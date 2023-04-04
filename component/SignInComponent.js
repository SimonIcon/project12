import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useContext } from 'react'
import { NewsContext } from '../API/context'

const SignInComponent = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const onChangeEmail= (c) => {setEmail(c)}
    const onChangePassword = (p) =>{ setPassword(p)}

    const { loginInUser,user } = useContext(NewsContext);
    const[comment,setComment] = useState('');
    // signing in user
     //   validating user email
    function validateEmail(e) {
         const re = /\S+@\S+\.\S+/;
         return re.test(e);
    }
    const[emailError,setEmailError] = useState('');
    const[passwordError,setPasswordError] = useState('');
    const signInUser = () =>{
      if(!validateEmail(email)){
        setEmailError("invalid email")
        setTimeout(() => {setEmailError("")},1000)
          setEmail("")
      }else if(password.length < 6){
        setPasswordError("weak password you should have atleast six characters")
        setTimeout(() => {setPasswordError(" ")},1000)
        setPassword('')
      }else{
         loginInUser(email,password);
          if(user){
            setComment("succesfully login")
          }else{
            setComment("failed to login,check your email and password")
            setEmail('');
            setPassword('');
          }
      }
      
    }
  return (
   <SafeAreaView>
      {comment ? <Text style={styles.loginComment}>{comment}</Text>:null}
    <View>
         {emailError ? <Text variant='p' style={styles.errors}>{emailError}</Text>:null}
      <TextInput
        style={styles.input}
        onChangeText={(text)=>onChangeEmail(text)}
        value={email}
        placeholder="Type your email"
        keyboardType="email-address"
 />
     {passwordError ? <Text variant='p' style={styles.errors}>{passwordError}</Text>:null}
      <TextInput
        style={styles.input}
        onChangeText={(text)=>onChangePassword(text)}
        value={password}
        placeholder="Enter your password"
        keyboardType="visible-password"
      />
       <View style={styles.forgotContainer}>
            <Text style={styles.forgotText}>forgotten your password</Text>
            <TouchableOpacity>
              <Text style={styles.forgotBtn}>click here</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={signInUser}>
              <Text style={styles.loginText}>sign in</Text>
       </TouchableOpacity>
    </View>
   </SafeAreaView>
  )
}

export default SignInComponent

const styles = StyleSheet.create({
     input:{
    margin:10,
    padding:6,
    borderRadius:15,
    fontSize:14,
    fontWeight:"bolder",
    borderWidth:3,
    border:"solid",
    borderColor:"green",
    marginTop:20,
    paddingLeft:15,
   

   },
   loginBtn:{
    marginTop:15,
    backgroundColor:"lightgreen",
    margin:10,
    borderWidth:3,
    borderColor:"black",
    borderRadius:15,

   },
   loginText:{
    padding:8,
    textAlign:"center",
    fontSize:15,
    fontWeight:"bold",
    textTransform:"capitalize",
   },
   forgotContainer:{
     flexDirection:"row",
     justifyContent:"center",
     alignContent:"center",
     alignItems:"center",
     alignSelf:"center"
   
   },
   forgotText:{
    fontWeight:"bold",
    color:"blue",
    marginRight:20,
    textAlign:"center"
    
   },
   forgotBtn:{
    paddingTop:7,
     fontWeight:"bold",
     textTransform:"capitalize",
   },
   errors:{
    textAlign:"center",
    fontSize:11,
    color:"red",
    fontStyle:"italic",
   },
   loginComment:{
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    color:"green",
    fontSize:20,
    fontWeight:"bold",
    paddingTop:10,
    textTransform:"capitalize",
    
   }
  
})