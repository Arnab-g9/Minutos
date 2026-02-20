import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background_primary,
    },
    contentContainer:{
      flexGrow:1,
      // gap: 30
    },
    content: {
      paddingHorizontal: 16,
      paddingBottom: 48,
      paddingTop: 8,
    },
    stepperContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 8,
      marginBottom: 24,
    },
    stepItem: {
      flex: 1,
      alignItems: 'center',
    },
    stepCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.background_tertiary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stepCircleActive: {
      backgroundColor: colors.primary,
    },
    stepCircleCompleted: {
      backgroundColor: colors.primaryLight,
    },
    stepLine: {
      flex: 1,
      height: 2,
      backgroundColor: colors.border_1,
      marginHorizontal: 4,
      alignSelf: 'center',
    },
    stepLineActive: {
      backgroundColor: colors.primary,
    },
    stepLabel: {
      marginTop: 6,
      textAlign: 'center',
    },
    section: {
      marginBottom: 32,
    },
    paymentSection: {
      marginBottom: 32,
      marginTop: 32,
    },
    orderSummarySection: {
      marginBottom: 32,
      marginTop: 32,
    },
    sectionTitle: {
      marginBottom: 16,
    },
    dropdown: {
      height: 48,
      borderWidth: 1,
      borderColor: colors.border_1,
      borderRadius: 12,
      paddingHorizontal: 16,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card_bg_primary,
    },
    input: {
      height: 48,
      borderWidth: 1,
      borderColor: colors.border_1,
      borderRadius: 12,
      paddingHorizontal: 16,
      color: colors.contentPrimary,
      backgroundColor: colors.card_bg_primary,
      fontSize: 14,
    },
    inputMultiline: {
      minHeight: 80,
      paddingTop: 12,
      textAlignVertical: 'top',
    },
    row: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 12,
    },
    lastInputContainer: {
      marginTop: 12,
      marginBottom: 0,
    },
    rowField: {
      flex: 1,
    },
    paymentOption: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 52,
      borderWidth: 1,
      borderColor: colors.border_1,
      borderRadius: 12,
      paddingHorizontal: 16,
      marginBottom: 8,
      backgroundColor: colors.card_bg_primary,
    },
    paymentOptionActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryLight,
    },
    paymentRadio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.border_1,
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    paymentRadioActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    paymentRadioInner: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primaryCtaText,
    },
    orderSummaryCard: {
      backgroundColor: colors.background_tertiary,
      borderRadius: 16,
      padding: 16,
      marginTop: 12,
    },
    orderSummaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    orderSummaryTotal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border_1,
    },
    placeOrderBtn: {
      marginTop: 24,
    },
    vendorModalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      padding: 24,
    },
    vendorModalContent: {
      backgroundColor: colors.card_bg_primary,
      borderRadius: 16,
      maxHeight: 320,
    },
    vendorOption: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border_1,
    },
  });
