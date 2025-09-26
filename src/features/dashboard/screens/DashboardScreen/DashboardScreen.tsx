import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './DashboardScreen.styles';
import Carousal from '../../../../components/Carousel/Carousal';
import { default as Text } from '../../../../components/Text/MSText';
import { ImageSource } from '../../../../constants/assets/Images';
import ProductCard from '../../components/ProductCard/ProductCard';
import { productData } from '../../mock/ProductMockData';
import { CategoryMockData } from '../../mock/CategoryMockData';
import { getResizeImageHeight } from '../../../../utils/getResizeImageHeight';
import RightArrow from 'react-native-vector-icons/Entypo';
import DashboardHeader from '../../components/Header/DashboardHeader/DashboardHeader';
import { ScreenNames } from '../../../../navigation/stack/constants';
import { IconsName } from '../../../../constants/assets/Icons';
import DashboardService from '../../service/DashboardService';
import { useDispatch, useSelector } from 'react-redux';
import { setBanner, setCategories } from '../../slice/DashboardSlice';
import { RootState } from '../../../../store/store';

const { width: screenWidth } = Dimensions.get('window');
const DashboardScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const {banner, categories} = useSelector((store: RootState)=>store.dashboard);
  const styles = useStyles(colors);
  const dispatch = useDispatch();
  const carouselHeight = screenWidth / 2;

  console.log("This is categories ===>", categories)


  const handlePressProfileIcon = () => {
    navigation.navigate(ScreenNames.PROFILE_SCREEN as never);
  };

  const fetchAds = async () => {
    const res = await DashboardService.getAds('/ads/get');
    dispatch(setBanner(res));
  };
  const fetchCategories = async()=>{
    const res = await DashboardService.getCategories('/category/getcategories');
    console.log("this is response of getcategories ===>", res);
    dispatch(setCategories(res.categories));
  }

  useEffect(() => {
    fetchAds();
    fetchCategories();
  }, []);

  useEffect(() => {
    const renderHeader = () => (
      <DashboardHeader
        address="HOME - Sultan Bhag, Erraga..."
        onPressProfileIcon={handlePressProfileIcon}
      />
    );
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [navigation]);

  const adjustedCategories =
  categories.length % 2 === 1
    ? [...categories, { id: 'dummy', name: '', image: null }]
    : categories;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Not required right now */}
      {/* <Label label='Zappping Delivery in 14 mins' /> */}

      <View
        style={[
          styles.bannerConatiner,
          { height: getResizeImageHeight(ImageSource.banner1, 32) },
        ]}
      >
        <Image source={{uri: banner?.homeBanner1}} style={styles.banner} />
      </View>

      <Carousal
        data={banner?.advertiseBanners}
        showPagination={true}
        loop={true}
        mode={'parallax'}
        renderItem={({ item }) =>{
          return (
          <View
            style={[
              styles.card,
              { width: screenWidth, height: carouselHeight },
            ]}
          >
            <Image
              source={{uri: item}}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )
        }}
        autoPlay
        autoPlayInterval={2000}
        showDots={false}
      />

      {/* label and button container */}
      <View style={[styles.lblBtnContainer, styles.marginTop]}>
        <Text varient="semiBold" fontSize={18}>
          Your Go to Items
        </Text>
        <TouchableOpacity style={styles.btn}>
          <Text varient="medium" fontSize={18} style={styles.btnTxt}>
            See All
          </Text>
          {/* <Image source={ImageSource.right} style={styles.rightArrow} /> */}
          <RightArrow
            name={IconsName.rightArrowIcon}
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Here show 4 items in each row */}
      <View style={styles.gridContainer}>
        {adjustedCategories.map((category, index) => (
          <View style={styles.gridItem} key={index.toString()}>
            <View style={[styles.gridImageBox, categories.length%2!==0 && index === adjustedCategories.length-1 && styles.dummyBox]}>
              <Image source={{uri: category.image}} style={styles.categoryImage} />
            </View>
            <Text
              style={{ textAlign: 'center', color: colors.primaryLight }}
              varient="medium"
              fontSize={12}
            >
              {category.name}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={[
          styles.bannerConatiner,
          { height: getResizeImageHeight(ImageSource.banner2, 32) },
        ]}
      >
        <Image
          source={{uri: banner?.homeBanner2}}
          style={[styles.banner, styles.banner2]}
        />
      </View>

      {/* label and button container */}
      <View style={[styles.lblBtnContainer, styles.marginTop]}>
        <Text varient="semiBold" fontSize={18}>
          Your Go to Items
        </Text>
        <TouchableOpacity style={styles.btn}>
          <Text varient="medium" fontSize={18} style={styles.btnTxt}>
            See All
          </Text>
          {/* <Image source={ImageSource.right} style={styles.rightArrow} /> */}
          <RightArrow name={'chevron-right'} size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      {/* Product container */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.productContainer}
      >
        {productData.map((product, index) => (
          <ProductCard product={product} key={index.toString()} />
        ))}
      </ScrollView>

      <View
        style={[
          styles.bannerConatiner,
          { height: getResizeImageHeight(ImageSource.banner2, 32) },
        ]}
      >
        <Image
          source={{uri: banner?.homeBanner3}}
          style={[styles.banner, styles.banner2]}
        />
      </View>

      {/* label and button container */}
      <View style={[styles.lblBtnContainer, styles.marginTop]}>
        <Text varient="semiBold" fontSize={18}>
          Your Go to Items
        </Text>
        <TouchableOpacity style={styles.btn}>
          <Text varient="medium" fontSize={18} style={styles.btnTxt}>
            See All
          </Text>
          {/* <Image source={ImageSource.right} style={styles.rightArrow} /> */}
          <RightArrow name={'chevron-right'} size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      {/* Product container */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.productContainer}
      >
        {productData.map((product, index) => (
          <ProductCard product={product} key={index.toString()} />
        ))}
      </ScrollView>

            <View
        style={[
          styles.bannerConatiner,
          { height: getResizeImageHeight(ImageSource.banner2, 32) },
        ]}
      >
        <Image
          source={{uri: banner?.homeBanner2}}
          style={[styles.banner, styles.banner2]}
        />
      </View>

      {/* label and button container */}
      <View style={[styles.lblBtnContainer, styles.marginTop]}>
        <Text varient="semiBold" fontSize={18}>
          Your Go to Items
        </Text>
        <TouchableOpacity style={styles.btn}>
          <Text varient="medium" fontSize={18} style={styles.btnTxt}>
            See All
          </Text>
          {/* <Image source={ImageSource.right} style={styles.rightArrow} /> */}
          <RightArrow name={'chevron-right'} size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      {/* Product container */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.productContainer}
      >
        {productData.map((product, index) => (
          <ProductCard product={product} key={index.toString()} />
        ))}
      </ScrollView>

      <View
        style={[
          styles.bannerConatiner,
          { height: getResizeImageHeight(ImageSource.banner2, 32) },
        ]}
      >
        <Image
          source={{uri: banner?.homeBanner4}}
          style={[styles.banner, styles.banner2]}
        />
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
