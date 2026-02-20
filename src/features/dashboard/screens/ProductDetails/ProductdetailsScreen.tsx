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
import { ScreenNames } from '../../../../navigation/stack/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { setCart } from '../../../cart/slice/CartSlice';
import CartService from '../../../cart/service/CartService';
import { Toast } from 'toastify-react-native';
import { IItem } from '../../Types/GetSubCategorieItems.Types';


export interface IProductWeightData {
  weight: string;
  price: number;
  per100: number;
  discount?: number;
}

interface props {
  route: any
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


const ProductdetailsScreen = ({ route }: props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { product } = route.params ?? {};
  const carouselHeight = screenWidth / 2;
  const styles = useStyles(colors);
  const dispatch = useDispatch();
  const { cart } = useSelector((store: RootState) => store.cart);
  const { user } = useSelector((store: RootState) => store.auth);

  const handleProfileIconPress = () => {
    navigation.navigate(ScreenNames.PROFILE_SCREEN as never);
  };

  const handleAddToCart = async () => {
    const p = product as IItem;
    if (!p?._id) return;
    const existingProduct = cart.find((item) => {
      // Handle both string and object productId formats
      const itemProductId = typeof item.productId === 'string' 
        ? item.productId 
        : (item.productId as any)?._id;
      return itemProductId === p._id;
    });
    try {
      if (!existingProduct) {
        await CartService.addToCart('/api/cart/add', {
          productId: p._id,
          quantity: 1,
          userId: user?.id,
        });
        const price = p.price;
        const newProduct = {
          _id: '',
          productId: p._id, // Store as string, not object
          name: p.name,
          image: p.images?.[0] || '',
          images: p.images || [],
          unit: p.unit,
          price,
          originalPrice: p.originalPrice,
          quantity: 1,
          lineTotal: price,
          discount: p.discount || 0,
        };
        dispatch(setCart([...cart, newProduct]));
      } else {
        const newQty = existingProduct.quantity + 1;
        await CartService.updateCart('/api/cart/update', {
          productId: p._id,
          quantity: newQty,
          userId: user?.id,
        });
        const price = existingProduct.price;
        const newProduct = {
          ...existingProduct,
          quantity: newQty,
          lineTotal: price * newQty,
        };
        const newCartData = cart.map((cartProd) => {
          // Handle both string and object productId formats
          const cartProductId = typeof cartProd.productId === 'string' 
            ? cartProd.productId 
            : (cartProd.productId as any)?._id;
          return cartProductId === p._id ? newProduct : cartProd;
        });
        dispatch(setCart(newCartData));
      }
      Toast.show({
        type: 'success',
        text1: 'Cart Updated',
        text2: existingProduct ? `${p.productName} quantity updated` : `${p.productName} added to the cart`,
        position: 'bottom',
        visibilityTime: 1500,
        autoHide: true,
      });
    } catch (error) {
      console.log('Error adding to cart: ', error);
    }
  };

  useEffect(() => {
    const renderHeader = () => (
      <ProductDetailsHeader address="HOME - Sultan Bhag, Erraga..." onProfileIconPress={handleProfileIconPress} />
    );
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [navigation]);

  console.log("this is product inside product details page ==>", product)
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
      <View style={styles.carousalContainer}>
        <Carousal
          data={product?.images ?? []}
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
                source={{ uri: item }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}
          showDots
        />
      </View>
      <Text varient="semiBold" fontSize={20} style={styles.title}>
        {product?.productName}
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
            ₹{product?.discountedMRP}
          </Text>
          <Text varient="regular" fontSize={16} style={styles.actualPrice}>
            ₹{product?.originalPrice}
          </Text>
          <Text varient="medium" fontSize={16} style={styles.offerText}>
            {' '}
            {product?.discount}% OFF
          </Text>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart} activeOpacity={0.8}>
          <Cart name={'shopping-cart'} size={20} color={colors.primaryCtaText} />
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
