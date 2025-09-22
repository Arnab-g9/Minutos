import { Dimensions, StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
       flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background_secondary,
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
      borderWidth: 2,
      borderColor: colors.border_1,
      backgroundColor: colors.contentQuaternary,
      borderRadius: 12,
    },
    title: {
      color: colors.primaryCtaText,
    },
    label: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
