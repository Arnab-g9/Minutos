import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background_primary,
    },
    card: {
      borderRadius: 12,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      flex: 1, // 👈 fills parent
      height: '100%',
      resizeMode: 'cover', // maintains aspect ratio, crops excess
    },
    title: {
      marginBottom: 11,
      paddingHorizontal: 16,
    },
    carousalContainer: {
      marginTop: 39,
    },
    contentContainerStyle: {
      gap: 16,
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    priceAndAddBtnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 23,
      marginBottom: 16,
      paddingHorizontal: 16,
      alignItems: 'flex-end'
    },
    priceAndOfferContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'flex-end',
    },
    actualPrice: {
      color: colors.contentTertiary,
      lineHeight: 16,
      textDecorationLine: 'line-through',
    },
    offerPrice: {
      color: colors.contentPrimary,
      lineHeight: 24,
    },
    offerText: {
      lineHeight: 16,
      color: colors.contentGreen,
    },
    addBtn: {
      flexDirection: 'row',
      gap: 10,
      // width: 80,
      paddingHorizontal: 15,
      paddingVertical: 8,
      // height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 8,
    },
    btnTxt: {
      lineHeight: 20,
      color: colors.primaryCtaText,
    },
    seperator: {
      height: 4,
      backgroundColor: '#00000014',
    },
    productInfoConatiner: {
      paddingHorizontal: 16,
      marginTop: 16,
    },
    titleAndLebelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infoSection: {
      gap: 16,
    },
    InfoTitle: {
      fontSize: 18,
      lineHeight: 18,
    },
    label: {
      backgroundColor: colors.background_Quinary,
      width: 104,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      gap: 2,
    },
    expdate: {
      color: colors.primary,
      lineHeight: 14,
    },
    dateTitle: {
      lineHeight: 14,
    },
    info: {
      gap: 4,
      maxWidth: 267,
    },
    infoTitle: {
      fontSize: 14,
      lineHeight: 14,
    },
    infoVal: {
      fontSize: 14,
      color: colors.contentTertiary,
    },
    frequentBaughtProductsContainer: {
      gap: 16,
      paddingVertical: 6,
      paddingHorizontal: 16,
    },
    frequentBaughtSectionTitle: {
      lineHeight: 18,
      paddingVertical: 20,
      paddingHorizontal: 16
    },
    titleAndfrequentBaughtProductsContainer: {
      backgroundColor: colors.background_Quinary,
      marginTop: 17,
    }
  });
