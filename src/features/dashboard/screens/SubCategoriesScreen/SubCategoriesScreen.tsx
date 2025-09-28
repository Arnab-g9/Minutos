import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PrimaryHeader from '../../../../components/Header/PrimaryHeader/PrimaryHeader';
import { useNavigation } from '@react-navigation/native';
import DashboardService from '../../service/DashboardService';
import { ISubcategory } from '../../Types/GetSubCategory.Types';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './SubCategoriesScreen.styles';
import { default as Text } from '../../../../components/Text/MSText'
import { IItem } from '../../Types/GetSubCategorieItems.Types';
import ProductCard from '../../components/ProductCard/ProductCard';

const SubCategoriesScreen = ({ route }: { route: any }) => {
    const [subCategories, setSubCategories] = useState<ISubcategory[] | []>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<ISubcategory | null>(null);
    const [Items, setItems] = useState<IItem[] | []>([])
    const { colors } = useTheme();
    const styles = useStyles(colors);
    const { name } = route.params ?? {};
    const navigation = useNavigation();

    const handlePressSubCategory = (item: ISubcategory) => {
        setSelectedSubCategory(item);
    }

    const fetchSubCategoryData = async () => {
        const res = await DashboardService.getSubCategories('/category/subcategories', name);
        setSubCategories(res?.subcategories);
    }

    const fetchSubCategroyItems = async () => {
        const res = await DashboardService.getSubCategoriesProduct('/product/subcategories?subCategories', selectedSubCategory?._id || "");
        setItems(res?.data)
    }

    console.log("this is items ==>", Items)

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

    useEffect(() => {
        fetchSubCategroyItems();
    }, [selectedSubCategory])

    console.log("This is selectd category ===>", selectedSubCategory)

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.sectionContainer1} style={styles.section1} showsVerticalScrollIndicator={false}>
                {
                    subCategories?.map((subCat, index) => <TouchableOpacity style={[styles.subCatItemContainer]} key={index.toString()} onPress={() => handlePressSubCategory(subCat)} activeOpacity={1}>
                        <View style={[styles.item, selectedSubCategory?._id === subCat._id && styles.selectedItem]}>
                            <Image source={{ uri: subCat.image }} style={styles.sideBarImage} />
                            <Text style={styles.itemTxt} fontSize={13}>{subCat.name}</Text>
                        </View>
                    </TouchableOpacity>)
                }
            </ScrollView>
            <ScrollView contentContainerStyle={styles.sectionContainer2} >
                {
                    Items?.map((item, index) => <ProductCard product={item} key={index.toString()} />)
                }
            </ScrollView>
        </View>
    )
}

export default SubCategoriesScreen
