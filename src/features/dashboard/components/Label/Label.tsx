import React from 'react'
import { useTheme } from '../../../../theme/ThemeProvider'
import { useStyles } from './Label.styles';
import LinearGradient from 'react-native-linear-gradient';
import { default as Text } from '../../../../components/Text/MSText'
interface props {
    label: string,
}

const Label = ({ label }: props) => {
    const { colors } = useTheme();
    const styles = useStyles(colors);
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.primaryDark, colors.primaryLight]} style={styles.container}>
            <Text varient='semiBold' style={styles.labelText}>{label}</Text>
        </LinearGradient >
    )
}

export default Label
