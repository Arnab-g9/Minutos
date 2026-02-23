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
        borderRadius: 12,
        height: 'auto',
        marginVertical: 16,
    },
    banner: {
        height: '100%',
        width: '100%',
        resizeMode: 'stretch',
        borderRadius: 12,
    },
    banner2: {
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
        // marginTop: 20
    },
    marginTop: {
        marginVertical: 20
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
        height: 120,
        margin: 4,
        gap: 6,
        justifyContent: 'center',
        alignItems: 'center',
        //    backgroundColor: 'red'
    },
    gridImageBox: {
        width: '100%',
        height: '70%',
        borderRadius: 15,
        padding: 12,
        backgroundColor: colors.background_tertiary
    },
    dummyBox: {
        backgroundColor: colors.background_primary
    },
    categoryImage: {
        width: '100%',
        height: '100%',
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
    title: {
        color: colors.contentPrimary
    }
})