import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';
import { EdgeInsets } from 'react-native-safe-area-context';

export const useStyles = (colors: ColorsType, insets: EdgeInsets) => StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background_primary,
        padding: 16,
        paddingTop: 0,
    },
    keyboardAvoidingViewContainer: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        // paddingTop: 20
    },
    title: {
        // fontFamily: FontFamily.POPPINS_MEDIUM,
        fontSize: 24,
        lineHeight: 30,
        color: colors.contentPrimary,
    },
    subtitle: {
        // fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: 16,
        color: colors.subtitle,
        lineHeight: 24,
        marginTop: 8,
        marginBottom: 16,
    },
    otpcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    otpInput: {
        height: 50,
        flex: 1,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colors.border_2,
        textAlign: 'center',
        marginEnd: 16,
        // fontFamily: FontFamily.POPPINS_REGULAR,
        fontSize: 18,
        lineHeight: 22,
    },
    activeOtpInput: {
        borderColor: colors.primary,
    },
    otpInputLast: {
        marginEnd: 0,
    },
    spacer: {
        flex: 1,
    },
    cta: {
        marginBottom: insets.bottom
    }
});