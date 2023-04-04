import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { NewsContext } from '../API/context'
import { Card, Image } from 'react-native-elements'
import { CardImage } from '@rneui/base/dist/Card/Card.Image'



const FavoriteScreen = () => {
  const { fav } = useContext(NewsContext)
  console.log(fav[1])

  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 20 }}
      scrollEventThrottle={16}
      style={styles.scrollContainer}
    >
      {
        fav.map((item) => (
          <View key={item.publishedAt}>
            <Card>
              <Text style={styles.title}>{item.title}</Text>
              <CardImage source={{ uri: item.url }} style={{ width: "80%", height: 170 }} />
              <View style={styles.containerOne}>
                <Text>{(new Date(item.publishedAt)).toDateString()}</Text>
                <Text>{item.source.name}</Text>
              </View>
              <Text style={styles.content}>{item.content}</Text>

            </Card>
          </View>
        ))
      }

    </ScrollView>
  )
}

export default FavoriteScreen

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

})