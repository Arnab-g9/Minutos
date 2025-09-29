import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import PrimaryHeader from '../../../../components/Header/PrimaryHeader/PrimaryHeader';
import { useNavigation } from '@react-navigation/native';
import DashboardService from '../../service/DashboardService';
import { ISubcategory } from '../../Types/GetSubCategory.Types';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './SubCategoriesScreen.styles';
import { default as Text } from '../../../../components/Text/MSText';
import { IItem } from '../../Types/GetSubCategorieItems.Types';
import ProductCard from '../../components/ProductCard/ProductCard';
import NoDataFound from '../../../../components/NoDataFound/NoDataFound';

const SubCategoriesScreen = ({ route }: { route: any }) => {
  const [subCategories, setSubCategories] = useState<ISubcategory[] | []>([]);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<ISubcategory | null>(null);
  const [Items, setItems] = useState<IItem[] | []>([]);
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { name } = route.params ?? {};
  const navigation = useNavigation();

  const handlePressSubCategory = (item: ISubcategory) => {
    setSelectedSubCategory(item);
  };

  const fetchSubCategoryData = async () => {
    const res = await DashboardService.getSubCategories(
      '/category/subcategories',
      name,
    );
    setSubCategories([
      { _id: '0', name: 'All', category: 'All' },
      ...res.subcategories,
    ]);
  };

  const fetchSubCategroyItems = async () => {
    const res = await DashboardService.getSubCategoriesProduct(
      '/product/subcategories?subCategories',
      selectedSubCategory?._id || '',
    );
    setItems(res?.data);
  };

  useEffect(() => {
    const renderHeader = () => <PrimaryHeader title={name} />;
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [name, navigation]);

  useEffect(() => {
    fetchSubCategoryData();
  }, [name]);

  useEffect(() => {
    fetchSubCategroyItems();
  }, [selectedSubCategory]);

  useEffect(() => {
    setSelectedSubCategory({ _id: '0', name: 'All', category: 'All' });
  }, []);

  console.log('This is selectd category ===>', Items);

  return (
    <View style={styles.container}>
      {/* section-1 */}
      <FlatList
        data={subCategories}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.subCatItemContainer]}
            key={index.toString()}
            onPress={() => handlePressSubCategory(item)}
            activeOpacity={1}
          >
            <View
              style={[
                styles.item,
                selectedSubCategory?._id === item._id && styles.selectedItem,
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.sideBarImage} />
              <Text style={[styles.itemTxt, selectedSubCategory?._id === item._id && styles.selectedText]} fontSize={13}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.sectionContainer1}
        style={styles.section1}
        showsVerticalScrollIndicator={false}
      />
      {/* section-2 */}
      <FlatList
        data={Items}
        renderItem={({ item, index }) => <ProductCard product={item} />}
        contentContainerStyle={styles.sectionContainer2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={NoDataFound}
      />
    </View>
  );
};

export default SubCategoriesScreen;
