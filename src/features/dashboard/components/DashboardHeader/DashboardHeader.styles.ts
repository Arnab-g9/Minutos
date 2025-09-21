import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) => StyleSheet.create({
    container: {
        backgroundColor: colors.background_secondary,
        padding: 16
    },
    section1: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});