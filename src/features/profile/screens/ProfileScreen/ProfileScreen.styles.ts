import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background_primary,
    },
    contentContainer: {
      flexGrow: 1,
      padding: 16,
      backgroundColor: colors.background_primary,
    },
    nameAndProfileimageContainer: {
      flexDirection: 'row',
      gap: 20,
      alignItems: 'center',
    },
    useName: {
      color: colors.contentPrimary,
    },
    imageContainer: {
      height: 80,
      width: 80,
      borderRadius: 50,
      backgroundColor: colors.background_tertiary,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    circleStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    phNo: {
      color: colors.contentTertiary,
    },
    optionsContainer: {
      flexDirection: 'row',
      gap: 16,
      marginTop: 20,
    },
    infoContainer: {
      marginTop: 20,
      padding: 16,
      backgroundColor: colors.card_bg_primary,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border_1,
    },
  });
