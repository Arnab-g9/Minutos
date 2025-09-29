import { Dimensions, StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background_primary,
      paddingHorizontal: 16,
      paddingVertical: 20,
      justifyContent: 'space-between',
    },
    section1: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   backgroundColor: colors.background_secondary,
    //   paddingHorizontal: 16,
    //   paddingVertical: 20,
    //   justifyContent: 'space-between',
    },
    iconAndTitlecontainer: {
      gap: 14,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    btn: {
      width: 112,
      height: 42,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 12,
    },
    btnTxt:{
      color: colors.primaryCtaText
    },
    title: {
      color: colors.contentPrimary,
    },
    label: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
