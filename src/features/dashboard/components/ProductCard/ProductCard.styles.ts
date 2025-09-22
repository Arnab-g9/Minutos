import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) => StyleSheet.create({
    container: {
        // height: 210,
        width: 136,
        borderRadius: 12,
        backgroundColor: colors.background_primary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 12
    },
    imgContainer: {
        height: 88,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    offerContainer: {
        position: 'absolute',
        top: -15,
        right: -15,
        justifyContent: 'center',
    },
    prodName: {
        marginTop: 10
    },
    prodWeight: {
        marginTop: 26,
        color: colors.contentTertiary
    },
    priceAndAddBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 9
    },
    addBtn: {
        height: 32,
        width: 32,
        borderRadius: 8,
        backgroundColor: colors.background_primary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addIcon: {
        width: 16,
        height: 16
    },
    crossPrice: {
        textDecorationLine: 'line-through',
        color: colors.contentPrimary,
        fontSize: 12,
    },
    price: {
        color: colors.primary
    },
    offerTextContainer: {
        position: 'absolute',
        width: '50%',
        right: 8
    },
    offerText: {
        color: colors.primaryCtaText
    },
})