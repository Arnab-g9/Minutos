import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background_primary,
    },
    contentContainer: {
      flexGrow: 1,
      padding: 16,
    },
    nameAndProfileimageContainer: {
      flexDirection: 'row',
      gap: 20,
      alignItems: 'center',
    },
    imageContainer: {
      height: 80,
      width: 80,
      borderRadius: 50,
      backgroundColor: colors.background_tertiary,
      justifyContent: 'flex-end',
      alignItems: 'center',
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
      backgroundColor: colors.background_primary,
      borderRadius: 20,
    },
  
  });
