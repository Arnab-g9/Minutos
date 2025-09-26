import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../../cart/components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './CategoryScreen.styles';
import { CategoryMockData } from '../../../dashboard/mock/CategoryMockData';
import { default as Text } from '../../../../components/Text/MSText'
import PrimaryHeader from '../../../../components/Header/PrimaryHeader/PrimaryHeader';

const CategoryScreen = () => {
    const { colors } = useTheme();
    const styles = useStyles(colors);
    const navigation = useNavigation();
    useEffect(() => {
        const renderHeader = () => (
            <>
               <PrimaryHeader title='Category' />
            </>
        );
        navigation.setOptions({
            headerShown: true,
            header: renderHeader,
        });
    }, [navigation]);
    return (
        <ScrollView contentContainerStyle={styles.contentContainerStyle} style={styles.container}>
            {/* Here show 4 items in each row */}
            <View style={styles.gridContainer}>
                {
                    CategoryMockData.map((category, index) => <View style={styles.gridItem} key={index.toString()}>
                        <View style={styles.gridImageBox}>
                            <Image source={category.image} />

                        </View>
                        <Text style={{ textAlign: 'center', color: colors.primaryLight }} varient='medium' fontSize={12}>{category.name}</Text>
                    </View>)
                }
            </View>
        </ScrollView>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({})