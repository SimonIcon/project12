import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NewsContext } from '../API/context';
import SingleNews from '../component/SingleNews';


const NewsScreen = ({ route }) => {
  const navigation = useNavigation();
  // const { data } = route.params;
  const { news: { articles }, setNews, category } = useContext(NewsContext);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle1}>{category}</Text>
        <TouchableOpacity style={styles.btnHome}
          onPress={() => {
            navigation.navigate("HomeScreen")
            setNews([])
          }}>
          <Text>home</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* rendering news fetched form the backed */}
        {
          articles ? (
            <FlatList
              data={articles}
              renderItem={({ item }) =>
                <SingleNews item={item} />
              }
            />

          ) :
            (
              <View>
                <Text>news articles are not fetched because of technical error</Text>
              </View>
            )
        }
      </View>
    </SafeAreaView>
  )
}

export default NewsScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007FFF",
    position: "relative",


  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  subtitle: {
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: "600",
    fontStyle: "normal"
  },
  btnHome: {
    borderRadius: 10,
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5,

  },
  subtitle1: {
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: "bold",
    borderBottomWidth: 5,
    borderRadius: 10,
    borderColor: "white",
  }
})