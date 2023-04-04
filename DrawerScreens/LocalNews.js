import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import LocalNewsModal from '../component/LocalNewsModal'
import { NewsContext } from '../API/context'

const LocalNews = () => {
    const [openModal, setOpenModal] = useState(false)
    const { localNews } = useContext(NewsContext)
    return (
        <SafeAreaView>
            <View style={styles.localNewsHeader}>

                <TouchableOpacity>
                    <Text style={styles.homeButton}>home</Text>
                </TouchableOpacity>
                <Text style={styles.localNewsTitle}>local news</Text>
                <TouchableOpacity style={styles.add} onPress={() => setOpenModal(true)}>
                    <Text style={styles.addLabel}>Add topic</Text>
                </TouchableOpacity>
                {/* post trending modal */}
                <Modal visible={openModal} transparent={true} onRequestClose={() => setOpenModal(false)}>
                    <LocalNewsModal setOpenModal={setOpenModal} />
                </Modal>

            </View>
            <ScrollView>
                {
                    localNews.map((news) => (
                        <View key={news.id}>
                            <View style={styles.cardHeader}>
                                <Image
                                    source={news.autherProfile}
                                    style={styles.image}

                                />
                                <Text>{news.author}</Text>
                                <Text>{news.postedAt.toDate().toDateString()} </Text>
                            </View>
                            <View style={styles.cardBody}>
                                <Text style={styles.newsHeader}>{news.title}</Text>
                                <Image style={styles.newsImage} source={news.sceneImage} />
                                <Text style={styles.newsDescription}>{news.description}</Text>
                            </View>
                            <View style={styles.cardActionArea}>
                                <Text>action area</Text>
                            </View>

                        </View>
                    ))
                }
            </ScrollView>


        </SafeAreaView>

    )
}

export default LocalNews

const styles = StyleSheet.create({
    localNewsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 10

    },
    add: {
        padding: 5,

    },
    addLabel: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1
    },
    localNewsTitle: {
        fontSize: 19,
        fontWeight: "bold",
        textTransform: "capitalize",
        textDecorationStyle: "double",
        textDecorationLine: "underline"

    },
    homeButton: {
        textTransform: "capitalize",
        fontWeight: "bold",
        fontSize: 15,
    },
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        marginRight: 20,
        marginLeft: 15,
        justifyContent: "space-between"
    },
    cardBody: {
        height: 230,
    },
    newsHeader: {
        paddingLeft: 30,
        paddingTop: 10,
        fontSize: 18,
        textTransform: "capitalize",
        fontWeight: 'bold'
    },
    newsImage: {
        paddingTop: 10,
        width: "80%",
        height: "70%",
        paddingLeft: 20,
    },
    newsDescription: {
        paddingLeft: 30,
        paddingTop: 10,
        fontSize: 15,
        fontWeight: "700"
    },
    cardActionArea: {
        display: "flex",
        flexDirection: "row",
        paddingLeft: 40,
        paddingRight: 30,
        justifyContent: "space-between"
    },
    image: {
        height: 50,
        width: 50,
        borderWidth: 1,



    }

})