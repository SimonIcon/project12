import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native';
import AppNavigator from './component/AppNavigator';
import { useContext, useEffect } from 'react'
import Context, { NewsContext } from './API/context';
import { Provider as PaperProvider } from 'react-native-paper';
import HeaderComponet from './component/HeaderComponet';
import Authentication from './component/Authentication';




function App() {
  const { checkActive } = useContext(NewsContext);
  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <NavigationContainer>

          {
            checkActive ? <>
              <HeaderComponet />
              <AppNavigator />
            </> : <><Authentication /></>
          }
          <StatusBar barStyle="black" />


        </NavigationContainer>
      </PaperProvider>


    </SafeAreaView>
  );
}

export default () => {
  return (
    <Context>
      <App />
    </Context>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"

  },
});
