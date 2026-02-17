import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './DashboardScreen.styles';
import Carousal from '../../../../components/Carousel/Carousal';
import { default as Text } from '../../../../components/Text/MSText';
import { ImageSource } from '../../../../constants/assets/Images';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getResizeImageHeight } from '../../../../utils/getResizeImageHeight';
import RightArrow from 'react-native-vector-icons/Entypo';
import DashboardHeader from '../../components/Header/DashboardHeader/DashboardHeader';
import { ScreenNames } from '../../../../navigation/stack/constants';
import { IconsName } from '../../../../constants/assets/Icons';
import DashboardService from '../../service/DashboardService';
import { useDispatch, useSelector } from 'react-redux';
import { setBanner, setCategories, setHotDealItems1, setHotDealItems2, setHotDealItems3 } from '../../slice/DashboardSlice';
import { RootState, store } from '../../../../store/store';
import CartService from '../../../cart/service/CartService';
import useGetLocation from '../../../../hooks/useGeoLocation';
import { setCart } from '../../../cart/slice/CartSlice';
import AddressModal from '../../components/AddressModal/AddressModal';

const { width: screenWidth } = Dimensions.get('window');
const DashboardScreen = () => {
  const [shwoAddressModal, setShowAddressModal] = useState(false);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { banner, categories, hotDealItems1, hotDealItems2, hotDealItems3, currentAddress } = useSelector((store: RootState) => store.dashboard);
  const { user } = useSelector((store: RootState) => store.auth)
  const styles = useStyles(colors);
  const dispatch = useDispatch();
  const { isLocationPermissionGranted, getCurrentLocation } = useGetLocation()

  const carouselHeight = screenWidth / 2;

  const adjustedCategories =
    categories?.length % 2 === 1
      ? [...categories, { id: 'dummy', name: '', image: null }]
      : categories;


  const handlePressProfileIcon = () => {
    navigation.navigate(ScreenNames.PROFILE_SCREEN as never);
  };

  const fetchAds = async () => {
    const res = await DashboardService.getAds('/api/ads/get');
    console.log("This is response of banner ===>", res)
    dispatch(setBanner(res));
  };

  const fetchInitialCartData = async () => {
    const res = await CartService.getInitailCartItem("/api/cart?userId", user?.id!)
    dispatch(setCart(res?.items))
  }

  const fetchCategories = async () => {
    const res = await DashboardService.getCategories('/api/category/categories');
    console.log("categories response +++ ===>", res);
    dispatch(setCategories(res.categories));
  }

  const fetchCategorieItemsById = async (id: string, type: number) => {
    const res = await DashboardService.getSubCategoriesProduct('/api/product/subcategories?subCategories', id);
    if (type === 0) {
      dispatch(setHotDealItems1(res?.data));
    } else if (type === 1) {
      dispatch(setHotDealItems2(res?.data));
    } else {
      dispatch(setHotDealItems3(res?.data))
    }

  }

  const handleCategoryPress = (name: string) => {
    (navigation as any).navigate(ScreenNames.SUBCATEGORY_SCREEN as never, {
      name: name
    })
  }

  const handlePressDetectLocation = async () => {
    console.log("getting current location ===>");
    await getCurrentLocation()
  }

  const handlePressSaveLocation = () => {
    setShowAddressModal(false);
  }

  const handlePressAddressBtn = () => {
    setShowAddressModal(true);
  }

  const headerAddress = useMemo(() => {
    if (currentAddress) return currentAddress;
    return 'Detecting location...';
  }, [currentAddress]);

  useEffect(() => {
    const renderHeader = () => (
      <DashboardHeader
        address={headerAddress.length > 20 ? headerAddress.slice(0, 30) + "..." : headerAddress}
        onPressProfileIcon={handlePressProfileIcon}
        onPressAddressBtn={handlePressAddressBtn}
      />
    );
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [navigation, headerAddress]);

  useEffect(() => {
    fetchAds();
    fetchCategories();
    fetchCategorieItemsById('68c31d7043f5a67c5b62b07d', 0);
    fetchCategorieItemsById('68c90e2b44c6da7aa09c5300', 1);
    fetchCategorieItemsById('68c31d5843f5a67c5b62b075', 2);

    fetchInitialCartData();
  }, []);

  useEffect(() => {
    if (isLocationPermissionGranted) {

      getCurrentLocation()
    }
  }, [isLocationPermissionGranted]);


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
        <Image source={{ uri: banner?.homeBanner1 }} style={styles.banner} />
      </View>

      <Carousal
        data={banner?.advertiseBanners}
        showPagination={true}
        loop={true}
        mode={'parallax'}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                styles.card,
                { width: screenWidth, height: carouselHeight },
              ]}
            >
              <Image
                source={{ uri: item }}
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
        <Text varient="semiBold" fontSize={18} style={styles.title}>
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
        {adjustedCategories?.map((category, index) => (
          <TouchableOpacity style={styles.gridItem} key={index.toString()} disabled={categories.length % 2 !== 0 && index === adjustedCategories.length - 1} onPress={() => handleCategoryPress(category.name)}>
            <View style={[styles.gridImageBox, categories.length % 2 !== 0 && index === adjustedCategories.length - 1 && styles.dummyBox]}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
            </View>
            <Text
              style={{ textAlign: 'center', color: colors.contentPrimary }}
              varient="medium"
              fontSize={12}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={[
          styles.bannerConatiner,
          { height: getResizeImageHeight(ImageSource.banner2, 32) },
        ]}
      >
        <Image
          source={{ uri: banner?.homeBanner2 }}
          style={[styles.banner, styles.banner2]}
        />
      </View>

      {/* label and button container */}
      <View style={[styles.lblBtnContainer, styles.marginTop]}>
        <Text varient="semiBold" fontSize={18} style={styles.title}>
          Hot Deals
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
        {hotDealItems1?.map((product, index) => (
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
          source={{ uri: banner?.homeBanner3 }}
          style={[styles.banner, styles.banner2]}
        />
      </View>

      {/* label and button container */}
      <View style={[styles.lblBtnContainer, styles.marginTop]}>
        <Text varient="semiBold" fontSize={18} style={styles.title}>
          Hot Deals
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
        {hotDealItems2?.map((product, index) => (
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
          source={{ uri: banner?.homeBanner4 }}
          style={[styles.banner, styles.banner2]}
        />
      </View>

      {/* label and button container */}
      <View style={[styles.lblBtnContainer, styles.marginTop]}>
        <Text varient="semiBold" fontSize={18} style={styles.title}>
          Hot Deals
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
        {hotDealItems3?.map((product, index) => (
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
          source={{ uri: banner?.homeBanner4 }}
          style={[styles.banner, styles.banner2]}
        />
      </View>

      {/* label and button container */}
      <View style={[styles.lblBtnContainer, styles.marginTop]}>
        <Text varient="semiBold" fontSize={18} style={styles.title}>
          Indian Mithai
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
        {hotDealItems1?.map((product, index) => (
          <ProductCard product={product} key={index.toString()} />
        ))}
      </ScrollView>
      <AddressModal visible={shwoAddressModal} onPressDetectLocation={handlePressDetectLocation} onPressSaveLocation={handlePressSaveLocation} addressTxt={headerAddress} onDismiss={() => setShowAddressModal(false)} />
    </ScrollView>
  );
};

export default DashboardScreen;
