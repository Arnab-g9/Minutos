import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { default as Text } from '../../../../../components/Text/MSText'
import { useNavigation } from '@react-navigation/native';
import LocationIcon from 'react-native-vector-icons/Ionicons'
import DownArrowIcon from 'react-native-vector-icons/Entypo'
import UserIcon from 'react-native-vector-icons/Feather'
import LeftIcon from 'react-native-vector-icons/Feather'
import { useTheme } from '../../../../../theme/ThemeProvider';
import { useStyles } from './ProductDetailsHeader.styles';

interface props {
    address: string,
    onProfileIconPress: ()=> void
}

const ProductDetailsHeader = ({ address, onProfileIconPress }: props) => {
    const { colors } = useTheme();
    const styles = useStyles(colors);
    const navigation = useNavigation();
    const onBackPress = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <View style={styles.section1}>
                <View style={[styles.section1, styles.flex1]}>
                    <TouchableOpacity onPress={onBackPress}>
                        {/* <Image source={ImageSource.leftArrow} style={styles.leftArrow} /> */}
                        <LeftIcon name={'chevron-left'} size={20} color={colors.primary} />
                    </TouchableOpacity>
                    {/* <Image source={ImageSource.location} style={styles.location} /> */}
                    <LocationIcon name={'location-outline'} size={20} color={colors.primary} />
                    <Text varient='medium' fontSize={16} style={styles.addressTxt}>{address}</Text>
                    {/* <Image source={ImageSource.downArrow} style={styles.downArrow} /> */}
                    <DownArrowIcon name={'chevron-small-down'} size={20} color={colors.primary} />
                </View>
                {/* <Image source={ImageSource.profile} style={styles.profile} /> */}
                <UserIcon name={'user'} size={20} color={colors.primary} onPress={onProfileIconPress} />

            </View>
        </SafeAreaView>
    )
}

export default ProductDetailsHeader

