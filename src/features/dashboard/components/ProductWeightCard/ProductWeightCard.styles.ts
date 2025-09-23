import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) => StyleSheet.create({
    container: {
        width: 120,
        // height: 85,
        borderWidth: 1,
        borderColor: colors.border_1,
        borderRadius: 8,
        padding: 8,
        gap: 7
    },
    activeContainer: {
        borderColor: colors.border_active,
        backgroundColor: colors.bckground_tertiary
    },
    price:{
        // marginTop: 6
        lineHeight: 14
    },
    per100:{
         color: colors.contentGreen,
         lineHeight: 14,
         marginTop: 6
    },
     offerContainer: {
        position: 'absolute',
        top: -15,
        right: -15,
        justifyContent: 'center',
    },
        offerTextContainer: {
        position: 'absolute',
        width: '50%',
        right: 8
    },
        offerText: {
        color: colors.primaryCtaText
    }
})