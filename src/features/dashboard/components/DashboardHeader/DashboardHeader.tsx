import { Text, View } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './DashboardHeader.styles';
import { useNavigation } from '@react-navigation/native';


const DashboardHeader = () => {
    const { colors } = useTheme();
    const styles = useStyles(colors);
    const navigation = useNavigation();
    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <View style={styles.section1}>

            </View>
        </SafeAreaView>
    )
}

export default DashboardHeader

