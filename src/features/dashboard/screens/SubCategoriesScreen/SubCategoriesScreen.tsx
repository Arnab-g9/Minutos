import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrimaryHeader from '../../../../components/Header/PrimaryHeader/PrimaryHeader';
import { useNavigation } from '@react-navigation/native';
import DashboardService from '../../service/DashboardService';
import { ISubcategory } from '../../Types/GetSubCategory.Types';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './SubCategoriesScreen.styles';
import { default as Text } from '../../../../components/Text/MSText'

const SubCategoriesScreen = ({ route }: { route: any }) => {
    const [subCategories, setSubCategories] = useState<ISubcategory[] | []>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const { colors } = useTheme();
    const styles = useStyles(colors);
    const { name } = route.params ?? {};
    const navigation = useNavigation();

    const fetchSubCategoryData = async () => {
        const res = await DashboardService.getSubCategories('/category/subcategories', name);
        setSubCategories(res?.subcategories);
    }

    useEffect(() => {
        const renderHeader = () => <PrimaryHeader title={name} />;
        navigation.setOptions({
            headerShown: true,
            header: renderHeader,
        });
    }, [name, navigation]);

    useEffect(() => {
        fetchSubCategoryData();
    }, [name])

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.sectionContainer1} style={styles.section1}>
                {
                    subCategories.map((subCat, index) => <View style={styles.item} key={index.toString()}>
                        <Image source={{ uri: subCat.image }} style={styles.sideBarImage} />
                        <Text style={styles.itemTxt}>{subCat.name}</Text>
                    </View>)
                }
            </ScrollView>
            <ScrollView contentContainerStyle={styles.sectionContainer2} >
                <Text>tet</Text>
            </ScrollView>
        </View>
    )
}

export default SubCategoriesScreen
