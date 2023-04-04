import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { countries } from '../API/api';
import { NewsContext } from '../API/context';

const Countries = () => {
    const { setCountryNews } = useContext(NewsContext)
    const [currentCountry, setCurrentCountry] = useState("united states");
    return (
        <View>
            <Text style={styles.title}>List of countries</Text>
            <View style={styles.header}>
                <Text style={styles.selectLabel}>selected country</Text>
                <Text style={styles.selectedValue}>{currentCountry}</Text>
            </View>
            <ScrollView style={styles.container}>
                {
                    countries.map((item) => (
                        <TouchableOpacity style={styles.countryName} key={item.code} onPress={() => {
                            setCountryNews(item.code)
                            setCurrentCountry(item.name)

                        }}>
                            <Text style={styles.countryName}>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>

        </View>
    )
}

export default Countries

const styles = StyleSheet.create({
    title: {
        left: 35,
        fontSize: 20,
        textDecorationLine: "underline"
    },
    header: {
        flexDirection: "row",
        paddingTop: 10,
        left: 20,
        paddingBottom: 10,
        textAlign: "center",
        alignItems: "center",
    },
    selectLabel: {
        paddingRight: 15,
        fontWeight: "bold",
        fontSize: 17,
    },
    selectedValue: {
        fontWeight: "bold",
        fontSize: 15,
        color: "purple",
        fontStyle: "italic",
        textTransform: "capitalize"
    },
    countryName: {
        paddingBottom: 5,
        left: 10,
    }
})