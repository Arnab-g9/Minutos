import { Image, StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../../theme/ThemeProvider';
import { useStyles } from './PrimaryHeader.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageSource } from '../../../constants/assets/Images';
import { default as Text } from '../../../components/Text/MSText'

interface props {
    address: string,
}

const PrimaryHeader = ({ address }: props) => {
    const { colors } = useTheme();
    const styles = useStyles(colors);
    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <View style={styles.section1}>
                <View style={[styles.section1, styles.flex1]}>
                    <Image source={ImageSource.leftArrow} style={styles.leftArrow} />
                    <Image source={ImageSource.location} style={styles.location} />
                    <Text varient='medium' fontSize={16} style={styles.addressTxt}>{address}</Text>
                    <Image source={ImageSource.downArrow} style={styles.downArrow} />
                </View>
                <Image source={ImageSource.profile} style={styles.profile} />

            </View>
        </SafeAreaView>
    )
}

export default PrimaryHeader

