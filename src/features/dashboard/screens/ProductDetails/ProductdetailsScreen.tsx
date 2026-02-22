import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImageSource } from '../../../../constants/assets/Images';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './ProductDetailsScreen.styles';
import Carousal from '../../../../components/Carousel/Carousal';
import { default as Text } from '../../../../components/Text/MSText';
import ProductCard from '../../components/ProductCard/ProductCard';
import DashboardService from '../../service/DashboardService';
import NoDataFound from '../../../../components/NoDataFound/NoDataFound';
const { width: screenWidth } = Dimensions.get('window');
import Cart from 'react-native-vector-icons/Feather';
import MinusIcon from 'react-native-vector-icons/Feather';
import PlusIcon from 'react-native-vector-icons/Feather';
import ProductDetailsHeader from '../../components/Header/ProductDetailsHeader/ProductDetailsHeader';
import { ScreenNames } from '../../../../navigation/stack/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { setCart } from '../../../cart/slice/CartSlice';
import CartService from '../../../cart/service/CartService';
import { Toast } from 'toastify-react-native';
import { IItem } from '../../Types/GetSubCategorieItems.Types';
import useGetLocation from '../../../../hooks/useGeoLocation';
import AddressModal from '../../components/AddressModal/AddressModal';


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
  const { currentAddress } = useSelector((store: RootState) => store.dashboard);
  const [similarProducts, setSimilarProducts] = useState<IItem[]>([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const { getCurrentLocation } = useGetLocation();

  const handleProfileIconPress = () => {
    navigation.navigate(ScreenNames.PROFILE_SCREEN as never);
  };

  const getCartProductId = (item: any) =>
    typeof item?.productId === 'string' ? item.productId : (item?.productId as any)?._id;

  const existingCartItem = cart.find((item) => getCartProductId(item) === (product as IItem)?._id);

  const handleAddToCart = async () => {
    const p = product as IItem;
    if (!p?._id) return;
    try {
      await CartService.addToCart('/api/cart/add', {
        productId: p._id,
        quantity: 1,
        userId: user?.id,
      });
      const price = p.price;
      const newProduct = {
        _id: '',
        productId: p._id,
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
      Toast.show({
        type: 'success',
        text1: 'Cart Updated',
        text2: `${p.productName} added to the cart`,
        position: 'bottom',
        visibilityTime: 1500,
        autoHide: true,
      });
    } catch (error) {
      console.log('Error adding to cart: ', error);
    }
  };

  const handleIncreaseQuantity = async () => {
    const p = product as IItem;
    if (!existingCartItem || !p?._id) return;
    const newQty = existingCartItem.quantity + 1;
    const price = existingCartItem.price;
    const newProduct = {
      ...existingCartItem,
      quantity: newQty,
      lineTotal: price * newQty,
    };
    const newCartData = cart.map((cartProd) =>
      getCartProductId(cartProd) === p._id ? newProduct : cartProd,
    );
    dispatch(setCart(newCartData));
    try {
      await CartService.updateCart('/api/cart/update', {
        productId: p._id,
        quantity: newQty,
        userId: user?.id,
      });
      Toast.show({
        type: 'success',
        text1: 'Cart Updated',
        text2: `${p.productName} quantity updated`,
        position: 'bottom',
        visibilityTime: 1500,
        autoHide: true,
      });
    } catch (error) {
      console.log('Error updating cart: ', error);
    }
  };

  const handleDecreaseQuantity = async () => {
    const p = product as IItem;
    if (!existingCartItem || !p?._id) return;
    const newQty = existingCartItem.quantity - 1;
    const productIdForApi = getCartProductId(existingCartItem);

    if (newQty >= 1) {
      const price = existingCartItem.price;
      const newProduct = {
        ...existingCartItem,
        quantity: newQty,
        lineTotal: price * newQty,
      };
      const newCartData = cart.map((cartProd) =>
        getCartProductId(cartProd) === p._id ? newProduct : cartProd,
      );
      dispatch(setCart(newCartData));
      try {
        await CartService.updateCart('/api/cart/update', {
          productId: productIdForApi,
          quantity: newQty,
          userId: user?.id,
        });
        Toast.show({
          type: 'success',
          text1: 'Cart Updated',
          text2: `${p.productName} quantity updated`,
          position: 'bottom',
          visibilityTime: 1500,
          autoHide: true,
        });
      } catch (error) {
        console.log('Error updating cart: ', error);
      }
    } else {
      const newCartData = cart.filter((cartProd) => getCartProductId(cartProd) !== p._id);
      dispatch(setCart(newCartData));
      try {
        await CartService.removeFromCart('/api/cart/remove', {
          productId: productIdForApi,
          userId: user?.id,
        });
        Toast.show({
          type: 'success',
          text1: 'Removed from cart',
          text2: `${p.productName} removed`,
          position: 'bottom',
          visibilityTime: 1500,
          autoHide: true,
        });
      } catch (error) {
        console.log('Error removing from cart: ', error);
      }
    }
  };

  const headerAddress = currentAddress || 'Detecting location...';
  const handlePressDetectLocation = async () => {
    setIsDetectingLocation(true);
    await getCurrentLocation();
    setIsDetectingLocation(false);
  };
  const handlePressSaveLocation = () => {
    setShowAddressModal(false);
  };
  const handlePressAddress = () => {
    setShowAddressModal(true);
  };

  useEffect(() => {
    const renderHeader = () => (
      <ProductDetailsHeader
        address={headerAddress.length > 25 ? headerAddress.slice(0, 25) + '...' : headerAddress}
        onProfileIconPress={handleProfileIconPress}
        onPressAddress={handlePressAddress}
      />
    );
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [navigation, headerAddress]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      const subCategoryId = product?.subCategory?.[0]?._id;
      if (!subCategoryId) {
        setSimilarProducts([]);
        return;
      }
      try {
        const res = await DashboardService.getSubCategoriesProduct(
          '/api/product/subcategories?subCategories',
          subCategoryId,
        );
        const items = (res?.data ?? []) as IItem[];
        const currentProductId = product?._id;
        const filtered = items.filter((item) => item._id !== currentProductId);
        setSimilarProducts(filtered);
      } catch {
        setSimilarProducts([]);
      }
    };
    fetchSimilarProducts();
  }, [product]);

  const carouselImages = product?.images?.length
    ? product.images
    : [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
      <View style={styles.carousalContainer}>
        <Carousal
          data={carouselImages.length ? carouselImages : ['']}
          showPagination={true}
          loop={carouselImages.length > 1}
          renderItem={({ item }) => {
            const imageUri = typeof item === 'string' ? item : (item as any)?.url || (item as any);
            const hasValidUri = imageUri && typeof imageUri === 'string' && imageUri.startsWith('http');
            return (
              <View
                style={[
                  styles.card,
                  { width: screenWidth, height: carouselHeight },
                ]}
              >
                <Image
                  source={hasValidUri ? { uri: imageUri } : ImageSource.item1}
                  style={[styles.image, { width: screenWidth, height: carouselHeight }]}
                  resizeMode="contain"
                />
              </View>
            );
          }}
          showDots
        />
      </View>
      <Text varient="semiBold" fontSize={20} style={styles.title}>
        {product?.productName}
      </Text>
      {/* product weight section */}
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {productWeightData.map((product, index) => (
          <ProductWeightCard product={product} key={index.toString()} />
        ))}
      </ScrollView> */}

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

        {existingCartItem ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[styles.quantityBtn, styles.quantityBtnLeft]}
              onPress={handleDecreaseQuantity}
              activeOpacity={0.8}
            >
              <MinusIcon name="minus" size={18} color={colors.primaryCtaText} />
            </TouchableOpacity>
            <View style={styles.quantityValue}>
              <Text varient="semiBold" fontSize={16} style={{ color: colors.contentPrimary }}>
                {existingCartItem.quantity}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.quantityBtn, styles.quantityBtnRight]}
              onPress={handleIncreaseQuantity}
              activeOpacity={0.8}
            >
              <PlusIcon name="plus" size={18} color={colors.primaryCtaText} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart} activeOpacity={0.8}>
            <Cart name={'shopping-cart'} size={20} color={colors.primaryCtaText} />
            <Text varient="medium" fontSize={16} style={styles.btnTxt}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        )}
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
          {/* <View style={styles.info}>
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
          </View> */}
          <Text style={styles.infoVal}>{product.description}</Text>
        </View>
      </View>

      <View style={styles.titleAndfrequentBaughtProductsContainer}>
        <Text varient='semiBold' fontSize={18} style={styles.frequentBaughtSectionTitle}>Similar Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.frequentBaughtProductsContainer,
            similarProducts.length === 0 && { minWidth: '100%' },
          ]}
        >
          {similarProducts.length > 0 ? (
            similarProducts.map((item) => <ProductCard product={item} key={item._id} />)
          ) : (
            <View style={{ minWidth: 200, paddingVertical: 24 }}>
              <NoDataFound message="No similar products found" />
            </View>
          )}
        </ScrollView>
      </View>
      <AddressModal
        visible={showAddressModal}
        onPressDetectLocation={handlePressDetectLocation}
        onPressSaveLocation={handlePressSaveLocation}
        addressTxt={headerAddress}
        onDismiss={() => setShowAddressModal(false)}
        isDetecting={isDetectingLocation}
      />
    </ScrollView>
  );
};

export default ProductdetailsScreen;
