import { Dimensions, Image, StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

const { width: screenWidth } = Dimensions.get('window');

export const useStyles = (colors: ColorsType) =>
  StyleSheet.create({
    card: {
      width: (screenWidth - 64) / 3,
      height: (screenWidth - 64) / 3,
      borderRadius: 15,
      backgroundColor: colors.card_bg_primary,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
      borderWidth:1,
      borderColor: colors.border_1
    },
    title: {
      color: colors.contentPrimary,
    },
  });
