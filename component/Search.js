import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { NewsContext } from '../API/context'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import SingleNews from './SingleNews';


const Search = ({ setModalVisible }) => {
    const { news: { articles }, } = useContext(NewsContext);
    const [searchResults, setSearchResults] = useState([])
    // search function
    const handleSearch = (text) => {
        if (!text) { setSearchResults([]); return; }
        setSearchResults(articles.filter((query) => query.title.includes(text)))
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search your favorite news</Text>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.back}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                {/* search text input */}
                <TextInput style={styles.searchInput} placeholder="search news" placeholderTextColor={"black"}
                    onChangeText={(text) => handleSearch(text)}
                    leftIcon={<Ionicons name="search" size={24} color="black" />} />
                <Button title="clear" onPress={() => setSearchResults([])} style={styles.clearBtn}
                />
            </View>
            {/* return search results */}
            {
                searchResults ? <ScrollView>
                    {
                        searchResults.slice(0, 10).map((item) => (
                            <View key={item.publishedAt}>
                                <SingleNews item={item} />
                            </View>))
                    }
                </ScrollView> : <View>
                    <Text> No search found</Text>
                </View>
            }
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",

    },
    header: {
        flexDirection: "row",
        left: 10,
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 1201,
        marginBottom: 15,

    },

    searchInput: {
        width: "60%",
        borderWidth: 1,
        paddingTop: 5,
        paddingLeft: 15,
        borderRadius: 14,
    },
    clearBtn: {
        color: "black",
        right: 15,
        backgroundColor: "white"

    },
    title: {
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
        zIndex: 1,
        fontWeight: "700",
        fontSize: 20,
        textDecorationLine: "underline",

    }

})