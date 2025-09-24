import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) => StyleSheet.create({
    container: {
        backgroundColor: colors.background_secondary,
        padding: 16,
        gap: 16
    },
    section1: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profile: {
        width: 17,
        height: 18,
    },
    downArrow: {
        width: 12,
        height: 7.5
    },
    location: {
        width: 14,
        height: 18
    },
    addressTxt: {
        color: colors.primaryCtaText,
        lineHeight: 16,
        marginLeft: 9,
        marginRight: 3
    },
    flex1: {
        flex: 1
    }
});