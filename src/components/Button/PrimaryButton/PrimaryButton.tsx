import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import useStyles from './PrimaryButton.styles';

interface Props {
    title: string
    titleStyle?: StyleProp<TextStyle>
    disabled?: boolean
    containerStyle?: StyleProp<ViewStyle>
    onPress: () => void
}

const PrimaryButton = (props: Props) => {
    const {
        title,
        titleStyle,
        disabled = false,
        containerStyle,
        onPress,
    } = props ?? {};

    const { colors } = useTheme();
    const styles = useStyles(colors);

    return <TouchableOpacity
        style={[styles.container, disabled && styles.containerDisabled, containerStyle]}
        disabled={disabled}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <Text style={[styles.title, disabled && styles.titleDisabled, titleStyle]}>{title}</Text>
    </TouchableOpacity>;
};

export default PrimaryButton;