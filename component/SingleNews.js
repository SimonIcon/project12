import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Card, Image } from 'react-native-elements'
import { Linking } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NewsContext } from '../API/context';


const SingleNews = ({ item }) => {
  const { setFavoriteNews, handleFavoriteNews } = useContext(NewsContext)
  return (
    <Card>
      <Text style={styles.title}>{item.title}</Text>
      <Image
        source={{ uri: item.urlToImage }}
        style={{ width: "100%", height: 200 }}
      />
      <View style={styles.containerOne}>
        <Text>{(new Date(item.publishedAt)).toDateString()}</Text>
        <Text>{item.source.name}</Text>
      </View>
      <Text style={styles.content}>{item.description}</Text>
      <View style={styles.info}>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => Linking.openURL(item.url)} style={styles.newsActions}>
          <MaterialCommunityIcons name="more" color="black" size={20} />
          <Text style={styles.text4}>read more</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newsActions} onPress={() => {
          setFavoriteNews(item)
          handleFavoriteNews(item.author, item.description, item.publishedAt, item.title, item.source, item.url)
        }}>
          <MaterialCommunityIcons name="download-circle" color="black" size={20} />
          <Text style={styles.text4}>save</Text>
        </TouchableOpacity>
      </View>
    </Card>
  )
}

export default SingleNews

const styles = StyleSheet.create({
  title: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",

  },

  content: {
    fontSize: 13,
    paddingBottom: 15,
    paddingTop: 5,
    fontWeight: "500",
  },
  containerOne: {
    flexDirection: "row",
    justifyContent: "space-around",
    textTransform: "lowerCase",
    paddingTop: 5,
    paddingBottom: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  newsActions: {
    justifyContent: "center",
    alignItems: 'center',
    padding: 5,
  },
  comments: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text4: {
    fontSize: 10,
    color: "blue",
    textTransform: "capitalize",
    fontFamily: "monospace"
  },
  text5: {
    paddingLeft: 5,
    fontSize: 10,
    fontWeight: "bold",
  }

})