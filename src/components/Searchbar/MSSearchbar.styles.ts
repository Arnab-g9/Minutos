import { StyleSheet } from 'react-native';
import { ColorsType } from '../../constants/Ui/colors/colors.types';


export const useStyles = (colors: ColorsType) => StyleSheet.create({
    container: {
        height: 48,
        backgroundColor: colors.searchbar,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    search: {
    }
})