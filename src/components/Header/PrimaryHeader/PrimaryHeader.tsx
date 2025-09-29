import { StatusBar, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../../theme/ThemeProvider';
import { useStyles } from './PrimaryHeader.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { default as Text } from '../../../components/Text/MSText'
import { useNavigation } from '@react-navigation/native';
import LeftIcon from 'react-native-vector-icons/Feather'

interface props {
    title: string,
}

const PrimaryHeader = ({ title }: props) => {
    const { colors } = useTheme();
    const styles = useStyles(colors);
    const navigation = useNavigation();
    const onBackPress = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <View style={styles.section1}>
                    <TouchableOpacity onPress={onBackPress}>
                        <LeftIcon name={'chevron-left'} size={20} color={colors.primary} />
                    </TouchableOpacity>
                    <Text varient='medium' fontSize={16} style={styles.title}>{title}</Text>
                </View>
        </SafeAreaView>
    )
}

export default PrimaryHeader

