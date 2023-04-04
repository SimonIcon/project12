import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text>in this screen we search news </Text>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"pink",
        justifyContent:"center"
    }
})