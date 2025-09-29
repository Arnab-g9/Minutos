import { TextInputProps, View } from 'react-native'
import React, { ReactNode } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useTheme } from '../../theme/ThemeProvider'
import { useStyles } from './MSSearchbar.styles'

interface props extends TextInputProps {
    renderLeftIcon?: () => ReactNode,
    renderRightIcon?: () => ReactNode,
}

const Searchbar = (props: props) => {
    const { colors } = useTheme();
    const styles = useStyles(colors);
    return (
        <View style={styles.container}>
            {
                props.renderLeftIcon && props.renderLeftIcon()
            }
            <TextInput placeholder={props.placeholder} value={props.value} placeholderTextColor={colors.contentTertiary} />
            {
                props.renderRightIcon && props.renderRightIcon()
            }
        </View>
    )
}

export default Searchbar

