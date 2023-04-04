import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { categories, sources } from '../API/api'
import { NewsContext } from '../API/context'
const HomeScreen = () => {
  const { setSource, setCategory } = useContext(NewsContext)
  const navigation = useNavigation()
  return (
    <View style={styles.mainContainer}>
      {/* categories of news */}
      <Text style={styles.subtitle}>categories</Text>
      <ScrollView  contentContainerStyle={{ paddingVertical: 20 }} scrollEventThrottle={16} horizontal={true}
        style={styles.scrollContainer}>
        {
          categories.map((item) => (
            <TouchableOpacity key={item.name} style={styles.categoryContainer} onPress={() => {
              setCategory(item.name)
              navigation.navigate('allNews');}}>
              <Image source={{ uri: item.pic }} style={{ width: "100%", height: "80%" }}/>
              <Text style={styles.text1}>{item.name}</Text>
            </TouchableOpacity>))
        }
      </ScrollView>
      {/* news sources */}
      <Text style={styles.subtitle}>sources</Text>
      <View style={styles.source}>
        {
          sources.map((s) => (
            <TouchableOpacity key={s.id} style={styles.sourceContainer} onPress={() => {
              setSource(s.id)
              navigation.navigate('allNews'); }}>
              <Image source={{ uri: s.pic }} style={styles.sourceImg} />
              <Text style={{ ...styles.text1, textAlign: "center" }}>{s.name}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>

  )

}

export default HomeScreen

const styles = StyleSheet.create({
  welcome: {
    textAlign: "center",
    fontSize: 16,
    color: "purple",
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  text1: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 8,
    marginHorizontal: 5,
    borderBottomWidth: 5,
    borderRadius: 10,
    textTransform: 'capitalize',
    alignSelf: "flex-start"
  },
  source: {

    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 5,
    justifyContent: "space-around",
  },
  sourceContainer: {
    height: "20%",
    width: "42%",
    justifyContent: "center",
    paddingTop: 10,
    margin: 7,


  },
  scrollContainer: {
    paddingBottom: 2,
    paddingTop: 2,
    height: "30%",

  },
  categoryContainer: {
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,

  },
  mainContainer: {
    position: "relative",
  },
  searchContainer: {
    paddingTop: 10,
    marginLeft: 22,
    marginRight: 22,
  },
  sourceImg: {
    size: "contain",
    height: "90%"
  }



})