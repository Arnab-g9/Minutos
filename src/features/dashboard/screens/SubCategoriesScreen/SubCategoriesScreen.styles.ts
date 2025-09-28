import { Dimensions, StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';
const { width } = Dimensions.get('window');
console.log("This is subCategory screen width ===>", width)

export const useStyles = (colors: ColorsType) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background_primary,
            flexDirection: 'row'
        },
        sectionContainer1: {
            flexGrow: 1,
            width: 100,
        },
        sectionContainer2: {
            flexGrow: 1,
            width: width - 100,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            padding: 10,
            justifyContent: 'space-evenly'
        },
        subCatItemContainer: {
            padding: 10,
        },
        item: {
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
            padding: 10,
        },
        selectedItem: {
            backgroundColor: colors.background_tertiary,
            borderWidth: 0.5,
            borderColor: colors.primary,
            borderRadius: 20,
        },
        sideBarImage: {
            height: 30,
            width: 30
        },
        itemTxt: {
            textAlign: 'center',
        },
        section1: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            backgroundColor: colors.background_primary
        }
    });
