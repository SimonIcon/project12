import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import TrendingModal from './TrendingModal';

const Trending = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <View>
            <View style={styles.trendingHeader}>
                <TouchableOpacity>
                    <Text>home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.add} onPress={() => setOpenModal(true)}>
                    <Text style={styles.addLabel}>Add topic</Text>
                </TouchableOpacity>
                {/* post trending modal */}
                <Modal visible={openModal} transparent={true} onRequestClose={() => setOpenModal(false)}>
                    <TrendingModal setOpenModal={setOpenModal} />
                </Modal>


            </View>
        </View>
    )
}

export default Trending

const styles = StyleSheet.create({
    trendingHeader: {
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
    }
})