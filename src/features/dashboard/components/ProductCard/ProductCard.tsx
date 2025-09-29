import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './ProductCard.styles';
import { default as Text } from '../../../../components/Text/MSText';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../../navigation/stack/constants';
import PlusIcon from 'react-native-vector-icons/Feather';
import { IItem } from '../../Types/GetSubCategorieItems.Types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { addToCart, ICartItem } from '../../../cart/slice/CartSlice';
import { Toast } from 'toastify-react-native';
import { ImageSource } from '../../../../constants/assets/Images';
import CartService from '../../../cart/service/CartService';

interface props {
  product: IItem;
}

const ProductCard = ({ product }: props) => {
  const { cart } = useSelector((store: RootState) => store.cart);
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth)

  const [imageError, setImageError] = useState(false);

  const imageUri = product?.images?.[0] || product?.images?.[1];

  const onPressAddIcon = async () => {

    const existingItem = cart.find(item => item._id === product._id);

    const cartItem: ICartItem = {
      ...product,
      quantity: existingItem ? existingItem.quantity + 1 : 1, // increment if exists
    };

    dispatch(addToCart(cartItem));

    // call api -- 
    const res = await CartService.addToCart('/cart/add', {
      productId: product._id,
      quantity: 1,
      userId: user?.id
    })
    console.log("This is response of cart service add product ===>", res.data)

    Toast.show({
      type: 'success',
      text1: 'Cart Updated',
      text2: existingItem
        ? `${product.productName} quantity updated`
        : `${product.productName} added to cart`,
      position: 'bottom',
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const handlePressCard = () => {
    navigation.navigate(ScreenNames.PRODUCT_DETAILS as never, {
      product: product,
    });
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handlePressCard}>
      {product.discount ? (
        <View style={styles.discountBadge}>
          <Text varient="semiBold" fontSize={14} style={styles.offerText}>
            {product.discount} % OFF
          </Text>
        </View>
      ) : (
        <View style={styles.emptyBadge}>
          <Text varient="semiBold" fontSize={14} style={styles.offerText}></Text>
        </View>
      )}

      <View style={styles.imgContainer}>
        <Image
          source={imageError || !imageUri ? ImageSource.item1 : { uri: imageUri }}
          style={styles.productImage}
          onError={() => setImageError(true)}
          resizeMode="contain"
        />
      </View>

      <Text varient="semiBold" style={styles.prodName}>
        {product?.productName?.length >= 10
          ? product.productName.slice(0, 10) + '...'
          : product.productName}
      </Text>
      <Text varient="regular" style={styles.prodWeight}>
        {product?.unit}
      </Text>

      <View style={styles.priceAndAddBtnContainer}>
        <View>
          <Text style={styles.crossPrice}>
            {product?.amountSaving ? `₹${product.originalPrice}` : null}
          </Text>
          <Text style={styles.price} varient="semiBold">
            {product?.amountSaving ? `₹${product.discountedMRP}` : `₹${product.price}`}
          </Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={onPressAddIcon} activeOpacity={0.8}>
          <PlusIcon name={'plus'} size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
