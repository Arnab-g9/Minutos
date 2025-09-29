import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) =>
  StyleSheet.create({
    navItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingVertical: 16,
      borderBottomWidth:1,
      borderColor: colors.border_1
    },
    titleContainer: {
      flex: 1,
    },
    navItemTxt:{
      color: colors.contentPrimary
    },
    borderBottom0:{
      borderBottomWidth: 0
    }
  });
