import { Dimensions, StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) => StyleSheet.create({
       container: {
        flexGrow: 1,
        backgroundColor: colors.background_primary
    },
    contentContainer:{
        paddingHorizontal: 16
    }
})