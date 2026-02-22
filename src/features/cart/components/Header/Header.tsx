import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../../../theme/ThemeProvider'
import { useStyles } from './Header.styles'
import { default as Text } from '../../../../components/Text/MSText'
import { useNavigation } from '@react-navigation/native'
import LeftIcon from 'react-native-vector-icons/Feather'

interface props {
  onPressBtn?: () => void;
  title: string,
  isCart?: boolean,
  onBackPress?: ()=> void
}

const Header = ({ onPressBtn, title, isCart = false, onBackPress }: props) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const navigation = useNavigation();
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={styles.iconAndTitlecontainer}>
        <TouchableOpacity onPress={() => onBackPress ? onBackPress() : navigation.goBack()}>
          {/* <Image source={ImageSource.leftArrowWhite}/> */}
          <LeftIcon name={'chevron-left'} size={20} color={colors.primary} />
        </TouchableOpacity>
        <Text varient='medium' fontSize={20} style={styles.title}>{title}</Text>
      </View>
      {
        isCart && <TouchableOpacity style={styles.btn} onPress={onPressBtn}>
          <Text varient='medium' fontSize={16} style={styles.btnTxt}>Empty Cart</Text>
        </TouchableOpacity>
      }
    </SafeAreaView>


  )
}

export default Header

const styles = StyleSheet.create({})