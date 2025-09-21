import { StyleSheet } from 'react-native'
import React from 'react'
import ThemeProvider from './src/theme/ThemeProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AppNavigation from './src/navigation/stack';

const App = () => {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={styles.container}>
        <AppNavigation />
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})