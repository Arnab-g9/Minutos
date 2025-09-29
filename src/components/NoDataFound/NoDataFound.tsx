import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../theme/ThemeProvider'
import { useStyles } from './NoDataFound.styles';
import { ImageSource } from '../../constants/assets/Images';
import { default as Text } from '../../components/Text/MSText'

interface props {
  message: string,
}

const NoDataFound = ({ message = "Sorry, no data found!" }: props) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* <Image source={ImageSource.noData} style={styles.Image} /> */}
        <Text varient='medium' fontSize={16} style={styles.message}>{message}</Text>
      </View>
    </View>
  )
}

export default NoDataFound

const styles = StyleSheet.create({})