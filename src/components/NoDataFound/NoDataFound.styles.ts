import { StyleSheet } from 'react-native';
import { ColorsType } from '../../constants/Ui/colors/colors.types';


export const useStyles = (colors: ColorsType) => StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    Image: {
        width: 100,
        height: 100
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        color: colors.contentPrimary
    }
})