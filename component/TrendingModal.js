import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const TrendingModal = ({ setOpenModal }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>create your story</Text>
                <TouchableOpacity onPress={() => setOpenModal(false)}>
                    <Text style={styles.button}>close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TrendingModal

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
    }
})