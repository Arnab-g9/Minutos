import { StyleSheet, View } from 'react-native'
import React from 'react'
import {default as Text} from '../../../../components/Text/MSText';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './Label.styles';

const Label = () => {
    const {colors} = useTheme();
    const styles = useStyles(colors);
  return (
    <View style={styles.container}>
      <Text varient='medium' fontSize={14}><Text varient='bold' fontSize={14}>₹76 </Text>saved on this order</Text>
    </View>
  )
}

export default Label

const styles = StyleSheet.create({})