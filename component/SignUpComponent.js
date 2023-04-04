import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../API/firebase';
import { NewsContext } from '../API/context';

const SignUpComponent = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('')
  const { registerUser, user } = useContext(NewsContext)



  const onChangeName = (n) => { setName(n) }
  const onChangeEmail = (e) => { setEmail(e) }
  const onChangeCountry = (c) => { setCountry(c) }
  const onChangePassword = (p) => { setPassword(p) }
  // uploading image from gallery
  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access camera roll is required!')
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri)

    }
  }
  // uploading image from camera
  const cameraImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access camera is required!');

      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }
  //  handling image uploading to firebase
  //  handling image uploading to firebase
  console.log(image)
  useEffect(() => {
    const uploadProfilePicture = () => {
      const name = "profile" + new Date().getTime();
      const storageRef = ref(storage, `userPictures/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on("state_changed", (snapshot) => {
        const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(uploadProgress)
      }, (err) => setUploadError(err), () => {
        getDownloadURL(uploadTask.snapshot.ref).then((profileUrl) => {
          setUrl(profileUrl)
          console.log(profileUrl);
        })
      })


    }
    image && uploadProfilePicture();

  }, [image])
  //   handling the sign up event
  //   validating user email
  function validateEmail(e) {
    const re = /\S+@\S+\.\S+/;
    return re.test(e);
  }
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('')
  const [imageError, setImageError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [comment, setComment] = useState("");
  const handleCreateAccount = async () => {

    if (name === "") {
      setNameError("username not enterred")
      setTimeout(() => { setNameError("") }, 1000)
      setName('')
    } else if (!validateEmail(email)) {
      setEmailError("invalid error")
      setTimeout(() => setEmailError(""), 1000)
      setEmail("")
    } else if (password.length < 6) {
      setPasswordError("weak password, password must contain more tahn six characters")
      setTimeout(() => { setPasswordError("") }, 1000)
      setPassword("")
    } else if (!url) {
      setImageError("image not selected");
      setTimeout(() => { setImageError("") }, 1000)
      setImage("")
    } else if (country === "") {
      setCountryError("your have not enterred your country")
      setTimeout(() => { setCountryError("") }, 1000)
      setCountry("")
    } else {
      registerUser(email, password, name, url, country)
      if (user) {
        setComment("successfully sign up")
      } else {
        setComment("failed to sign up")
        setName("")
        setEmail("")
        setPassword('')
        setCountry('')
      }
    }




  }




  return (
    <View>
      {comment ? <Text style={styles.loginComment}>{comment}</Text> : null}
      <View style={styles.inputContainer}>
        {nameError ? <Text variant='p' style={styles.errors}>{nameError}</Text> : null}
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeName(text)}
          value={name}
          placeholder="name"
          keyboardType="twitter"

        />
        {emailError ? <Text variant='p' style={styles.errors}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeEmail(text)}
          value={email}
          placeholder="Type your email"
          keyboardType="email-address"

        />
        {countryError ? <Text variant='p' style={styles.errors}>{countryError}</Text> : null}
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeCountry(text)}
          value={country}
          placeholder="Type your country"
          keyboardType="default"
        />
        {passwordError ? <Text variant='p' style={styles.errors}>{passwordError}</Text> : null}
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangePassword(text)}
          value={password}
          placeholder="set your password"
          keyboardType="visible-password"
        />
      </View>
      <Text style={styles.text1}>set your profile picture</Text>
      {imageError ? <Typography variant='p' style={styles.errors}>{imageError}</Typography> : null}
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.uploadBtn} onPress={pickImageFromGallery}>
          <Text style={styles.labelBtn}>open gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadBtn} onPress={cameraImage}>
          <Text style={styles.labelBtn}>open camera</Text>
        </TouchableOpacity>
      </View>
      {
        image ? <>
          <Text style={styles.uploadingStatus}>image is captured</Text>
        </> : null
      }
      <TouchableOpacity style={styles.loginBtn} onPress={handleCreateAccount}>
        <Text style={styles.loginText}>sign up</Text>
      </TouchableOpacity>
      <View>
        {
          progress >= 100 ? <Text variant="p" style={styles.uploadingStatus}>uploading complete</Text> :
            <Text style={styles.uploadingStatus}>uploading progress : {progress}%</Text>
        }
      </View>




    </View>
  )
}

export default SignUpComponent

const styles = StyleSheet.create({
  uploadingStatus: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
  },
  images: {
    height: 70,
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: "green",
    paddingTop: 6,
    paddingBottom: 6,
    width: "90%",
    borderRadius: 10,
    fontWeight: "bold",
    textTransform: "lowercase",
    fontSize: 16,
    paddingLeft: 15,
  },
  text1: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "italic",
    borderBottomWidth: 3,
    borderBottomColor: "black",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,


  },
  imageContainer: {
    marginTop: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  uploadBtn: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: "center",
    width: "45%",
    paddingLeft: 18,
    paddingRight: 10,

  },
  labelBtn: {
    textTransform: "capitalize",
    fontWeight: "bold",

  },
  loginBtn: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: "black",
    paddingTop: 6,
    paddingBottom: 6,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "palegreen",
    justifyContent: "center",
    alignSelf: "center",

  },
  loginText: {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 16,
    paddingLeft: 15,
    textAlign: "center",
  },
  errors: {
    textAlign: "center",
    fontSize: 11,
    color: "red",
    fontStyle: "italic",
  },
  loginComment: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
    textTransform: "capitalize",

  }



})