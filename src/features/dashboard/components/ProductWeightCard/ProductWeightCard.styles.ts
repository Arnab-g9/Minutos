import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) => StyleSheet.create({
    container: {
        width: 120,
        height: 85,
        borderWidth: 1,
        borderColor: colors.border_1,
        borderRadius: 8,
        padding: 8
    },
    activeContainer: {
        borderColor: colors.border_active,
        backgroundColor: colors.bckground_tertiary
    }
})