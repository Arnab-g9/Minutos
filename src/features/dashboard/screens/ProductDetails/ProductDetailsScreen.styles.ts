import { StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) => StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.background_primary,
        paddingHorizontal: 16
    },
    card: {
        borderRadius: 12,
        overflow: "hidden",
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,         // 👈 fills parent
        height: "100%",
        resizeMode: "cover", // maintains aspect ratio, crops excess
    },
    carousalContainer: {
        marginTop: 39
    },
    contentContainerStyle: {
        paddingHorizontal: 16,
        gap: 16
    }
})