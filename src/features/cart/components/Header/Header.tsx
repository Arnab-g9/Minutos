import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../../../theme/ThemeProvider'
import { useStyles } from './Header.styles'
import { ImageSource } from '../../../../constants/assets/Images'
import {default as Text} from '../../../../components/Text/MSText'
import { useNavigation } from '@react-navigation/native'

interface props {
  onPressBtn: ()=> void;
}

const Header = ({onPressBtn}: props) => {
    const {colors} = useTheme();
    const styles = useStyles(colors);
    const navigation = useNavigation();
  return (
         <SafeAreaView edges={['top']} style={styles.container}>
            <StatusBar translucent backgroundColor={'transparent'}/>
              <View style={styles.iconAndTitlecontainer}>
             <TouchableOpacity onPress={()=>navigation.goBack()}>
                 <Image source={ImageSource.leftArrowWhite}/>
             </TouchableOpacity>
                <Text varient='medium' fontSize={20} style={styles.title}>Cart (12)</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={onPressBtn}>
                <Text varient='medium' fontSize={16}>Empty Cart</Text>
            </TouchableOpacity>
         </SafeAreaView>

          
  )
}

export default Header

const styles = StyleSheet.create({})