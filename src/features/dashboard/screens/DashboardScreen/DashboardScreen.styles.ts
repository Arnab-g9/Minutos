import { Dimensions, StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) => StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.background_primary
    },
    bannerConatiner: {
        paddingHorizontal: 16,
        overflow: 'hidden',
        marginTop: 16,
    },
    banner: {
        resizeMode: 'cover',
        width: '100%',
        borderRadius: 12,
    },
    lblBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        // backgroundColor: 'green'
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    btnTxt: {
        fontSize: 16,
        color: colors.primary
    },
    rightArrow: {
        // width: 12,
        // height: 7.49
    },
    contentContainer: {
        gap: 16,
        paddingVertical: 6,
        paddingHorizontal: 16
    },
    productContainer: {
        marginTop: 20
    },
    marginTop: {
        marginTop: 26
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 8,
        paddingHorizontal: 16,
    },
    gridItem: {
        width: (Dimensions.get('window').width - 32) / 5,
        height: 112,
        margin: 4,
        gap: 6,
    },
    gridImageBox: {
        backgroundColor: colors.bckground_tertiary,
        borderRadius: 12,
    },
    card: {
        borderRadius: 12,
        overflow: "hidden",
    },
    image: {
        flex: 1,         // 👈 fills parent
        width: "100%",
        height: "100%",
        resizeMode: "cover", // maintains aspect ratio, crops excess
    },

})