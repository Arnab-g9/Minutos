// import { Dimensions, StyleSheet } from 'react-native';
// import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

// const { width } = Dimensions.get('window');

// export const useStyles = (colors: ColorsType) => StyleSheet.create({
//     container: {
//         width: (width - 24) / 3,
//         borderRadius: 12,
//         backgroundColor: colors.background_primary,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//         padding: 12
//     },
//     imgContainer: {
//         height: 88,
//         borderRadius: 12,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     offerContainer: {
//         position: 'absolute',
//         top: -15,
//         right: -15,
//         justifyContent: 'center',
//     },
//     prodName: {
//         marginTop: 10
//     },
//     prodWeight: {
//         marginTop: 26,
//         color: colors.contentTertiary
//     },
//     priceAndAddBtnContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 9
//     },
//     addBtn: {
//         paddingHorizontal: 8,
//         paddingVertical: 2,
//         borderRadius: 8,
//         backgroundColor: colors.background_primary,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 1,
//         },
//         shadowOpacity: 0.1,
//         shadowRadius: 2.84,
//         elevation: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'row',
//         gap: 10
//     },
//     addIcon: {
//         width: 12,
//         height: 12
//     },
//     crossPrice: {
//         textDecorationLine: 'line-through',
//         color: colors.contentPrimary,
//         fontSize: 12,
//     },
//     price: {
//         // color: colors.primary
//     },
//     offerTextContainer: {
//         position: 'absolute',
//         width: '50%',
//         right: 8
//     },
//     offerText: {
//         color: colors.primaryCtaText
//     },
//     addBtnTxt: {
//         color: colors.primary
//     }
// })

import { Dimensions, StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

const { width } = Dimensions.get('window');

export const useStyles = (colors: ColorsType) =>
    StyleSheet.create({
        container: {
            width: (width - 24) / 3,
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
            padding: 12,
        },
        imgContainer: {
            height: 88,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
        },
        productImage: {
            width: '80%',
            height: '80%',
            resizeMode: 'contain',
        },
        discountBadge: {
            alignSelf: 'flex-start',
            backgroundColor: colors.primary,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 5,
        },
        emptyBadge: {
            alignSelf: 'flex-start',
            backgroundColor: 'transparent',
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 5,
        },
        offerContainer: {
            position: 'absolute',
            top: -15,
            right: -15,
            justifyContent: 'center',
        },
        prodName: {
            marginTop: 10,
        },
        prodWeight: {
            marginTop: 26,
            color: colors.contentTertiary,
        },
        priceAndAddBtnContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 9,
        },
        addBtn: {
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 8,
            backgroundColor: colors.background_primary,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
            borderWidth: 1,
            borderColor: colors.border_2
        },
        addIcon: {
            width: 12,
            height: 12,
        },
        crossPrice: {
            textDecorationLine: 'line-through',
            color: colors.contentPrimary,
            fontSize: 12,
        },
        price: {
            // color: colors.primary
        },
        offerTextContainer: {
            position: 'absolute',
            width: '50%',
            right: 8,
        },
        offerText: {
            color: colors.primaryCtaText,
        },
        addBtnTxt: {
            color: colors.primary,
        },
    });
