import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card_bg_primary,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border_1,
      shadowColor: colors.primaryShadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border_1,
    },
    orderIdContainer: {
      flex: 1,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    vendorContainer: {
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border_1,
    },
    vendorInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    vendorDetails: {
      marginLeft: 10,
      flex: 1,
    },
    itemsContainer: {
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border_1,
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      paddingVertical: 4,
    },
    itemInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    itemQuantityBadge: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addressContainer: {
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border_1,
    },
    addressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 4,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    totalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
