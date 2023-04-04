import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../API/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { NewsContext } from '../API/context';

const LocalNewsModal = ({ setOpenModal }) => {
    const [homeTown, setHomeTown] = useState('')
    const [newsTitle, setNewsTitle] = useState('')
    const [newsDescription, setNewsDecsription] = useState('')
    const [image, setImage] = useState('');
    const onChangeHomeTown = (c) => { setHomeTown(c) }
    const onChangeTitle = (c) => { setNewsTitle(c) }
    const onChangeDescription = (c) => { setNewsDecsription(c) }
    // uploading image from gallery
    // const pickImageFromGallery = async () => {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== 'granted') {
    //         Alert.alert('Permission to access camera roll is required!')
    //         return;
    //     }
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });
    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri)

    //     }
    // }

    // // uploading image from camera
    // const cameraImage = async () => {
    //     const { status } = await ImagePicker.requestCameraPermissionsAsync();
    //     if (status !== 'granted') {
    //         Alert.alert('Permission to access camera is required!');

    //         return;
    //     }
    //     const result = await ImagePicker.launchCameraAsync({
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });
    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri)
    //     }
    // }
    // //  handling image uploading to firebase
    // const [url, setUrl] = useState('')
    // const [uploadError, setUploadError] = useState("")
    // const [progress, setProgress] = useState(0);
    // useEffect(() => {
    //     const uploadProfilePicture = () => {
    //         const name = "profile" + new Date().getTime();
    //         const storageRef = ref(storage, `localNews/${name}`);
    //         const uploadTask = uploadBytesResumable(storageRef, image);
    //         uploadTask.on("state_changed", (snapshot) => {
    //             const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //             setProgress(uploadProgress)
    //         }, (err) => setUploadError(err), () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((profileUrl) => {
    //                 setUrl(profileUrl)

    //             })
    //         })


    //     }
    //     image && uploadProfilePicture();

    // }, [image])
    // // handling posting event
    const [progress, setProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const [url, setUrl] = useState(null);


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
            setImage(result.assets.map((i) => { return i.uri }))


        }
    };

    const takePicture = async () => {
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
            setImage(result.assets.map((i) => { return i.uri }))
        }
    };

    useEffect(() => {
        const uploadProfilePicture = async () => {
            try {
                const name = "profile" + new Date().getTime();
                const storageRef = ref(storage, `localNews/${name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on("state_changed", (snapshot) => {
                    const uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(uploadProgress)
                }, (err) => setUploadError(err), () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((profileUrl) => {
                        setUrl(profileUrl)
                    })
                })
            } catch (error) {
                setUploadError(error);
            }
        };
        if (image) {
            uploadProfilePicture();
        }
    }, [image]);
    console.log("uploaded image" + url)

    console.log("fetched image" + image)
    const [homeTownError, setHomeTownError] = useState("")
    const [newsTitleError, setnewsTitleError] = useState("");
    const [newsDescriptionError, setnewsDescriptionError] = useState("")
    const { user, handleAddLocalNews } = useContext(NewsContext)
    const [comment, setComment] = useState("")
    const handlePost = () => {
        if (homeTown.length < 5) {
            setHomeTownError("please type your home town")
            setTimeout(() => {
                setHomeTownError("")
                setHomeTown("")
            }, 2000);
        } else if (newsTitle.length < 10) {
            setnewsTitleError("too short news title")
            setTimeout(() => {
                setNewsTitle("")
                setnewsTitleError("")
            }, 2000);

        } else if (newsDescription.length < 20) {
            setnewsDescriptionError("too short news description")
            setTimeout(() => {
                setnewsDescriptionError("")
                setNewsDecsription("")
            }, 2000);
        } else if (url === "") {
            return null
        }

        else {
            handleAddLocalNews(homeTown, newsTitle, newsDescription, user.username, user.userProfile, url)
            setComment("local news uploaded")
            setTimeout(() => {
                setOpenModal(false)
                setComment('')
                setHomeTown("")
                setNewsTitle("")
                setUrl("")
                setNewsDecsription("")

            }, 2000);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>what`s around you</Text>
                <TouchableOpacity onPress={() => setOpenModal(false)}>
                    <Text style={styles.button}>close</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                {comment ? <Text style={styles.uploadSuccess}>{comment}</Text> : null}
                {homeTownError ? <Text style={styles.uploadError}>homeTownError</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeHomeTown(text)}
                    value={homeTown}
                    placeholder="where are you located"
                    keyboardType="default"

                />
                {newsTitleError ? <Text style={styles.uploadError}>{newsTitleError}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeTitle(text)}
                    value={newsTitle}
                    placeholder="what about your area?"
                    keyboardType="default"
                    multiline={true}

                />
                {newsDescriptionError ? <Text style={styles.uploadError}>{newsDescriptionError}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeDescription(text)}
                    value={newsDescription}
                    placeholder="short description about the event"
                    keyboardType="default"
                    multiline={true}
                    numberOfLines={4}

                />
                {progress ? <Text style={styles.uploadSuccess}> uploading {progress} %</Text> : <>
                    {
                        uploadError ? <Text style={styles.uploadError}>{uploadError}</Text> : null
                    }
                </>}
                <TouchableOpacity style={styles.uploadImageButton} onPress={() => pickImageFromGallery()}>
                    <Text>upload image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadImageButton} onPress={() => takePicture()}>
                    <Text>capture image from scene</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postButton} onPress={() => handlePost()}>
                    <Text style={styles.postLabel}>post news</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LocalNewsModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: "pink",
        marginBottom: "25%",
        marginTop: "28%",
        marginLeft: "10%",
        marginRight: "10%",
        height: "70%"

    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,

    },
    title: {
        fontSize: 17,
        fontWeight: "bold",
    },
    button: {
        fontSize: 17,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    inputContainer: {
        paddingTop: 20,
        paddingLeft: 20,
    },
    input: {
        width: "90%",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        borderWidth: 1,
        fontSize: 16,
        fontWeight: "bold",
        backgroundColor: "white",
        color: "black",
        borderRadius: 15,
        marginTop: 15,

    },
    uploadImageButton: {
        width: "90%",
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        borderWidth: 1,
        fontSize: 16,
        fontWeight: "bold",
        backgroundColor: "white",
        color: "black",
        borderRadius: 15,
        marginTop: 15,
    },
    postButton: {
        width: "90%",
        backgroundColor: "palegreen",
        marginTop: 15,
        borderWidth: 1,
        borderRadius: 15
    },
    postLabel: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 20,
        textTransform: "capitalize",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    uploadSuccess: {
        textAlign: "center",
        fontSize: 12,
        marginTop: 10,
        marginBottom: 10,
        color: "green",
        fontWeight: "bold"
    },
    uploadError: {
        textAlign: "center",
        fontSize: 12,
        marginTop: 10,
        marginBottom: 10,
        color: "red",
        fontWeight: "bold"
    }
})