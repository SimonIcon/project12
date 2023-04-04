import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { NewsContext } from '../API/context'

const ProfileScreen = () => {
    const { user } = useContext(NewsContext)
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image
                    source={require('../assets/symohpic.jpg')}
                    style={styles.image}

                />
                <View style={styles.details}>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>followers</Text>
                        <Text style={styles.values}>12</Text>

                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>following </Text>
                        <Text style={styles.values}>67</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>username</Text>
                        <Text style={styles.values}>{user.username}</Text>

                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>{user.email}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.label}>country</Text>
                        <Text style={styles.values}>{user.userCountry}</Text>
                    </View>




                </View>



            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    image: {
        height: 180,
        width: "50%",
        borderWidth: 2,
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 20,

    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    container: {
        top: 20,
    },
    details: {
        height: 180,
        justifyContent: "space-around",
    },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",

    },
    label: {
        paddingRight: 20,
        textTransform: "capitalize",
        fontWeight: "bold",
        fontSize: 16,
    },
    values: {
        fontStyle: "italic",
    }

})