import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background_primary,
    },
    contentContainer: {
      paddingHorizontal: 16,
    },
    cartContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    slotAddressAndButtonContainer: {
      //   position: 'absolute',
      //   left: 0,
      //   right: 0,
      //   bottom: 0,
    },
    slotContainer: {
      height: 91,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 16,
      backgroundColor: colors.primary,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      color: colors.primaryCtaText,
      lineHeight: 20,
    },
    slotBtnTxt: {
      color: colors.primary,
    },
    subTitle: {
      color: colors.primaryCtaText,
      lineHeight: 18,
    },
    titleAndSubTitleContainer: {
      gap: 6,
      width: 208,
    },
    slotBtn: {
      width: 112,
      height: 42,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.primaryDark,
      backgroundColor: colors.background_primary,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background_primary,
      padding: 16,
      paddingBottom: 0,
      justifyContent: 'space-between'
    },
    changeAddressBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2
    },
    payBtnConatiner: {
      backgroundColor: colors.background_primary,
      padding: 16,
    },
    payBtn: {
      height: 48,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
    payBtnTxt: {
      color: colors.primaryCtaText,
      lineHeight: 16,
    }
  });
