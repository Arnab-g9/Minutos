import { Dimensions, StyleSheet } from 'react-native';
import { ColorsType } from '../../../../constants/Ui/colors/colors.types';

export const useStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
        paddingVertical: 16,
          gap: 8,
          borderBottomWidth: 1,
          borderColor: colors.border_2
    },
    productDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    productDetails:{
        flexDirection: 'row',
        gap: 7,
        alignItems: 'center',
    },
    actualPrice:{
        textDecorationLine: 'line-through',
        color: colors.contentQuaternary
    },
    dropDownAndCounterContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dropDown:{
        flexDirection: 'row',
        justifyContent: 'center',
        width: 76,
        height: 32,
        alignItems: 'center',
        gap: 8,
        backgroundColor: colors.dropdown_primary,
        borderRadius: 8
    },
    counter:{
        flexDirection: 'row',
        width: 96,
        height: 32,
    },
    btn:{
        backgroundColor: colors.background_Quaternary,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countValueContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftRadius:{
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    rightRadius:{
         borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    }
  });
