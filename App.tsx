import { StyleSheet } from 'react-native'
import React from 'react'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AppNavigation from './src/navigation/stack';
import { Provider } from 'react-redux';
import ToastManager from 'toastify-react-native'
import { persistor, store } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './src/theme/ThemeProvider';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <GestureHandlerRootView style={styles.container}>
            <AppNavigation />
            <ToastManager />
          </GestureHandlerRootView>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})