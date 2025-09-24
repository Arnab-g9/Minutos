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
import { useStyles } from './ProductDetailsScreen.styles';
import PrimaryHeader from '../../../../components/Header/PrimaryHeader/PrimaryHeader';
import Carousal from '../../../../components/Carousel/Carousal';
import { ImageSource } from '../../../../constants/assets/Images';
import { default as Text } from '../../../../components/Text/MSText';
import ProductWeightCard from '../../components/ProductWeightCard/ProductWeightCard';
import { productData } from '../../mock/ProductMockData';
import ProductCard from '../../components/ProductCard/ProductCard';
const { width: screenWidth } = Dimensions.get('window');
import Cart from 'react-native-vector-icons/Feather';
import ProductDetailsHeader from '../../components/Header/ProductDetailsHeader/ProductDetailsHeader';

const data = [
  { id: 1, image: ImageSource.bannerProduct1 },
  { id: 2, image: ImageSource.bannerProduct1 },
  { id: 3, image: ImageSource.bannerProduct1 },
  { id: 4, image: ImageSource.bannerProduct1 },
];

export interface IProductWeightData {
  weight: string;
  price: number;
  per100: number;
  discount?: number;
}

const productWeightData: IProductWeightData[] = [
  {
    weight: '500 gms',
    price: 24,
    per100: 4.4,
    discount: 5,
  },
  {
    weight: '1 kg',
    price: 40,
    per100: 4.4,
  },
  {
    weight: '1.5 kg',
    price: 54,
    per100: 3.6,
    discount: 10,
  },
  {
    weight: '1.5 kg',
    price: 54,
    per100: 3.6,
    discount: 2,
  },
];

const ProductdetailsScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const carouselHeight = screenWidth / 2;
  const styles = useStyles(colors);
  useEffect(() => {
    const renderHeader = () => (
      <ProductDetailsHeader address="HOME - Sultan Bhag, Erraga..." />
    );
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [navigation]);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
      <View style={styles.carousalContainer}>
        <Carousal
          data={data}
          showPagination={true}
          loop={true}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                { width: screenWidth, height: carouselHeight },
              ]}
            >
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}
          showDots
        />
      </View>
      <Text varient="semiBold" fontSize={20} style={styles.title}>
        Tata Salt
      </Text>
      {/* product weight section */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {productWeightData.map((product, index) => (
          <ProductWeightCard product={product} key={index.toString()} />
        ))}
      </ScrollView>

      {/* pricing section */}
      <View style={styles.priceAndAddBtnContainer}>
        <View style={styles.priceAndOfferContainer}>
          <Text varient="semiBold" fontSize={24} style={styles.offerPrice}>
            ₹24
          </Text>
          <Text varient="regular" fontSize={16} style={styles.actualPrice}>
            ₹25
          </Text>
          <Text varient="medium" fontSize={16} style={styles.offerText}>
            {' '}
            4% OFF
          </Text>
        </View>

        <TouchableOpacity style={styles.addBtn}>
          <Cart name={'shopping-cart'} size={20} color={colors.primaryCtaText}/>
          <Text varient="medium" fontSize={16} style={styles.btnTxt}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
      {/* seperator */}
      <View style={styles.seperator} />

      {/* product informnation section */}

      <View style={styles.productInfoConatiner}>
        <View style={styles.titleAndLebelContainer}>
          <Text style={styles.InfoTitle} fontSize={18} varient="medium">
            Product Information
          </Text>

          <TouchableOpacity style={styles.label}>
            <Text fontSize={12} varient="medium" style={styles.dateTitle}>
              EXPIRY DATE
            </Text>
            <Text fontSize={12} varient="medium" style={styles.expdate}>
              12 Jul 2023
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoSection}>
          <View style={styles.info}>
            <Text style={styles.infoTitle} varient="medium">
              COUNTRY OF ORIGIN
            </Text>
            <Text style={styles.infoVal}> India </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle} varient="medium">
              COUNTRY OF ORIGIN
            </Text>
            <Text style={styles.infoVal}> India </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle} varient="medium">
              COUNTRY OF ORIGIN
            </Text>
            <Text style={styles.infoVal}> India </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle} varient="medium">
              MANUFACTURER ADDRESS
            </Text>
            <Text style={[styles.infoVal, { lineHeight: 22 }]}>
              Tata Food Zone, Polt No 5/B, Phase 2, IDA, Cherlapally - 50005.{' '}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.titleAndfrequentBaughtProductsContainer}>
        <Text varient='semiBold' fontSize={18} style={styles.frequentBaughtSectionTitle}>Frequently Bought Together</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.frequentBaughtProductsContainer}
        >
          {
            productData.map((product, index) => <ProductCard product={product} key={index.toString()} />)
          }
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ProductdetailsScreen;
