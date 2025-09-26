import { Platform, StatusBar, StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';
import { EdgeInsets } from 'react-native-safe-area-context';

export const useStyles = (colors: ColorsType, insets: EdgeInsets) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background_primary,
        padding: 16,
        paddingTop: 0,
    },
    emptyHeader: {
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: colors.background_primary,
    },
    keyboardAvoidingViewContainer: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        paddingTop: 20
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
        marginTop: 4,
    },
    textInputContainer: {
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.border_1,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingTop: Platform.select({ android: 8, ios: 12 }),
        paddingBottom: Platform.select({ android: 4, ios: 12 }),
        flexDirection: 'row',
        alignItems: 'center',
    },
    defaultCountryCode: {
        fontSize: 16,
        color: colors.contentPrimary,
        marginEnd: Platform.select({ android: 2, ios: 4 }),
    },
    textInput: {
        fontSize: 16,
        flex: 1,
        color: colors.contentPrimary,
    },
    spacer: {
        flex: 1,
    },
    inputInfoMessage: {
        // fontFamily: FontFamily.POPPINS_REGULAR,
        color: colors.contentSecondary,
        marginTop: 8,
    },
    ctaContainer: {
        marginBottom: insets.bottom,
    }
});