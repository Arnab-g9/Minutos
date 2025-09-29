import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { useTheme } from '../../../../theme/ThemeProvider'
import { useStyles } from './NavItem.styles';
import {default as Text} from '../../../../components/Text/MSText'
import RightArrow from 'react-native-vector-icons/Entypo';
import { IconsName } from '../../../../constants/assets/Icons';
import OrderIcon from 'react-native-vector-icons/Feather';

interface props {
    renderIcon?: ()=>ReactNode,
    item: any,
    isLast: boolean
}

const NavItem = ({item, renderIcon, isLast}:props) => {
    const {colors} = useTheme();
    const styles = useStyles(colors);
    console.log("This is last item ==> ", isLast)

  return (
     <TouchableOpacity
            style={[styles.navItem, isLast && styles.borderBottom0]}
            activeOpacity={0.8}
          >
            <OrderIcon
              name={IconsName.orderIcon}
              size={30}
              color={colors.primary}
            />
            {
                renderIcon?.()
            }
            <View style={styles.titleContainer}>
              <Text fontSize={16} varient="medium" style={styles.navItemTxt}>
                {item.name}
              </Text>
            </View>
            <RightArrow
              name={IconsName.rightArrowIcon}
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
  )
}

export default NavItem

const styles = StyleSheet.create({})