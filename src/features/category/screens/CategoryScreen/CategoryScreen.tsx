import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './CategoryScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryHeader from '../../../../components/Header/PrimaryHeader/PrimaryHeader';
import { useNavigation } from '@react-navigation/native';
import CategoryService from '../../service/CategoryService';
import { setAllCategories } from '../../slice/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { default as Text } from '../../../../components/Text/MSText';
import { RootState } from '../../../../store/store';
import { ScreenNames } from '../../../../navigation/stack/constants';

const CategoryScreen = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { category } = useSelector((store: RootState) => store.category);

  const fetchAllCategoriesAndSubCategories = async () => {
    try {
      const res = await CategoryService.getAllCategoriesAndSubCategories(
        '/api/subcategory/categories-with-subcategories'
      );
      console.log('Fetched categories:', res?.categories);
      dispatch(setAllCategories(res?.categories));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubCategoryPress = (cat: any) => {
    console.log("This is sub category press ===>", cat);
    (navigation as any).navigate(ScreenNames.SUBCATEGORY_SCREEN as never, { name: cat?.name } as never);
  };

  useEffect(() => {
    const renderHeader = () => <PrimaryHeader title="All Categories" />;
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [navigation]);

  useEffect(() => {
    fetchAllCategoriesAndSubCategories();
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {category?.map((cat: any, index: number) => {
          // Safely handle cases where subcategories are missing
          const subCategories = cat?.subcategories || [];

          // Adjust layout if odd number of items
          const adjustedSubCategories =
            subCategories.length % 2 === 1
              ? [...subCategories, { id: 'dummy', name: '', image: null }]
              : subCategories;

          return (
            <View key={index} style={{ marginBottom: 24 }}>
              {/* Category Title */}
              <Text
                varient="bold"
                fontSize={16}
                style={{
                  marginBottom: 12,
                  color: colors.contentPrimary,
                  paddingLeft: 16,
                }}
              >
                {cat?.name}
              </Text>

              {/* Subcategory Grid */}
              <View style={styles.gridContainer}>
                {adjustedSubCategories.map((sub: any, subIndex: number) => (
                  <TouchableOpacity
                    key={subIndex.toString()}
                    style={[
                      styles.gridItem,
                      sub.id === 'dummy' && styles.dummyBox,
                    ]}
                    disabled={sub.id === 'dummy'}
                    onPress={() => handleSubCategoryPress(cat)}
                  >
                    <View
                      style={[
                        styles.gridImageBox,
                        sub.id === 'dummy' && styles.dummyBox,
                      ]}
                    >
                      {sub.image ? (
                        <Image
                          source={{ uri: sub.image }}
                          style={styles.categoryImage}
                          resizeMode="contain"
                        />
                      ) : null}
                    </View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: colors.contentPrimary,
                      }}
                      varient="medium"
                      fontSize={12}
                      numberOfLines={1}
                    >
                      {sub.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;

