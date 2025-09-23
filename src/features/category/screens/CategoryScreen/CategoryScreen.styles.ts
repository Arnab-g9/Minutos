import { Dimensions, StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) =>
    StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background_primary,
        },
        contentContainerStyle: {
            backgroundColor: colors.background_primary,
            flexGrow: 1,
            paddingVertical: 20,
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

    })