import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) => StyleSheet.create({
    container: {
        height: 28,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelText: {
        color: colors.primaryCtaText
    }
})