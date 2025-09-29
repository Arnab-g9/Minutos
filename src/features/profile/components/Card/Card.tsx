import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { useTheme } from '../../../../theme/ThemeProvider'
import { useStyles } from './Card.styles';
import {default as Text} from '../../../../components/Text/MSText'

interface props{
    onPress?: ()=> void,
    title?: string,
    renderIcon?: ()=> ReactNode
}

const Card = ({ onPress, title, renderIcon}:props) => {
    const {colors} = useTheme();
    const styles = useStyles(colors);
    console.log("This is title ===>", title);
    
  return (
    <TouchableOpacity style={styles.card}>
        {
            renderIcon?.()
        }
      <Text varient='medium' fontSize={14} style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({})