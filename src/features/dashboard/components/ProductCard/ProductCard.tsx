import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './ProductCard.styles';
import { default as Text } from '../../../../components/Text/MSText';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../../navigation/stack/constants';
import PlusIcon from 'react-native-vector-icons/Feather';
import MinusIcon from 'react-native-vector-icons/Feather';
import { IItem } from '../../Types/GetSubCategorieItems.Types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Toast } from 'toastify-react-native';
import { ImageSource } from '../../../../constants/assets/Images';
import { setCart } from '../../../cart/slice/CartSlice';
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
  const { user } = useSelector((store: RootState) => store.auth);

  console.log("This is product ===>", product)

  const [imageError, setImageError] = useState(false);

  const imageUri = product?.images?.[0] || product?.images?.[1];

  const getCartProductId = (item: { productId: string | { _id: string } }) =>
    typeof item.productId === 'string' ? item.productId : (item.productId as any)?._id;

  const existingProduct = cart.find(
    (item) => getCartProductId(item) === product._id,
  );

  const handleIncrement = async () => {
    try {
      if (!existingProduct) {
        await CartService.addToCart('/api/cart/add', {
          productId: product._id,
          quantity: 1,
          userId: user?.id,
        });
        const newProduct = {
          _id: '',
          productId: product._id,
          name: product.productName || product.name,
          image: product.images?.[0] || '',
          images: product.images || [],
          unit: product.unit,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: 1,
          lineTotal: product.price,
          discount: product.discount || 0,
        };
        dispatch(setCart([...cart, newProduct]));
        Toast.show({
          type: 'success',
          text1: 'Cart Updated',
          text2: `${product?.productName || product?.name} added to the cart`,
          position: 'bottom',
          visibilityTime: 1500,
          autoHide: true,
        });
      } else {
        const newQty = existingProduct.quantity + 1;
        await CartService.updateCart('/api/cart/update', {
          productId: product._id,
          quantity: newQty,
          userId: user?.id,
        });
        const newProduct = {
          ...existingProduct,
          quantity: newQty,
          lineTotal: existingProduct.lineTotal + existingProduct.price,
        };
        const newCartData = cart.map((cartProd) =>
          getCartProductId(cartProd) === product._id ? newProduct : cartProd,
        );
        dispatch(setCart(newCartData));
        Toast.show({
          type: 'success',
          text1: 'Cart Updated',
          text2: `${existingProduct.name} quantity updated`,
          position: 'bottom',
          visibilityTime: 1500,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handleDecrement = async () => {
    if (!existingProduct) return;
    const newQty = existingProduct.quantity - 1;
    try {
      if (newQty >= 1) {
        await CartService.updateCart('/api/cart/update', {
          productId: product._id,
          quantity: newQty,
          userId: user?.id,
        });
        const newProduct = {
          ...existingProduct,
          quantity: newQty,
          lineTotal: existingProduct.price * newQty,
        };
        const newCartData = cart.map((cartProd) =>
          getCartProductId(cartProd) === product._id ? newProduct : cartProd,
        );
        dispatch(setCart(newCartData));
        Toast.show({
          type: 'success',
          text1: 'Cart Updated',
          text2: `${existingProduct.name} quantity updated`,
          position: 'bottom',
          visibilityTime: 1500,
          autoHide: true,
        });
      } else {
        await CartService.removeFromCart('/api/cart/remove', {
          userId: user?.id,
          productId: product._id,
        });
        const newCartData = cart.filter(
          (cartProd) => getCartProductId(cartProd) !== product._id,
        );
        dispatch(setCart(newCartData));
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handlePressCard = () => {
    (navigation as any).navigate(ScreenNames.PRODUCT_DETAILS as never, {
      product: product,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={handlePressCard}
    >
      {product.discount ? (
        <View style={styles.discountBadge}>
          <Text varient="semiBold" fontSize={14} style={styles.offerText}>
            {Math.floor(product.discount)} % OFF
          </Text>
        </View>
      ) : (
        <View style={styles.emptyBadge}>
          <Text
            varient="semiBold"
            fontSize={14}
            style={styles.offerText}
          ></Text>
        </View>
      )}

      <View style={styles.imgContainer}>
        <Image
          source={
            imageError || !imageUri ? ImageSource.item1 : { uri: imageUri }
          }
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

      <View style={styles.priceAndAddContainer}>
        <View>
          <Text style={styles.crossPrice}>
            {product?.amountSaving ? `₹${product.originalPrice}` : null}
          </Text>
          <Text style={styles.price} varient="semiBold">
            {product?.amountSaving
              ? `₹${product.discountedMRP}`
              : `₹${product.price}`}
          </Text>
        </View>
        {existingProduct ? (
          <View style={styles.counterRow}>
            <View style={styles.counter}>
              <TouchableOpacity
                style={[styles.counterBtn, styles.counterBtnLeft]}
                onPress={handleDecrement}
                activeOpacity={0.8}
              >
                <MinusIcon name="minus" size={14} color={colors.primaryCtaText} />
              </TouchableOpacity>
              <View style={styles.counterValue}>
                <Text style={styles.counterValueText} varient="semiBold">
                  {existingProduct.quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.counterBtn, styles.counterBtnRight]}
                onPress={handleIncrement}
                activeOpacity={0.8}
              >
                <PlusIcon name="plus" size={14} color={colors.primaryCtaText} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleIncrement}
            activeOpacity={0.8}
          >
            <PlusIcon name="plus" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
