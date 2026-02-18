import { Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './Card.styles';
import { ImageSource } from '../../../../constants/assets/Images';
import { default as Text } from '../../../../components/Text/MSText';
import DownArrowIcon from 'react-native-vector-icons/Entypo';
import CrossIcon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { ICartItem } from '../../Types/Getcart.Types';
import { setCart } from '../../slice/CartSlice';
import CartService from '../../service/CartService';

interface props {
  item: ICartItem;
}

const Card = ({ item }: props) => {
  const [imageError, setImageError] = useState(false);
  const imageUri = item?.images?.[0] || item?.images?.[1];
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleIncreaseQuantity = async () => {
    const existingProduct = cart.find(
      cartProd => cartProd.productId === item.productId,
    );
    if (!existingProduct) return;
    const newQty = existingProduct.quantity + 1;
    const newProd = {
      ...existingProduct,
      quantity: newQty,
      lineTotal: existingProduct.price * newQty,
    };
    const newCartData = cart.map(cartProd =>
      cartProd.productId === item.productId ? newProd : cartProd,
    );
    dispatch(setCart(newCartData));
    try {
      await CartService.updateCart('/api/cart/update', {
        productId: item.productId,
        quantity: newQty,
        userId: user?.id,
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handleDecreaseQuantity = async () => {
    const existingProduct = cart.find(
      cartProd => cartProd.productId === item.productId,
    );
    if (!existingProduct) return;

    const newQty = existingProduct.quantity - 1;

    if (newQty >= 1) {
      const newProduct = {
        ...existingProduct,
        quantity: newQty,
        lineTotal: existingProduct.price * newQty,
      };
      const newCartData = cart.map(cartProd =>
        cartProd.productId === item.productId ? newProduct : cartProd,
      );
      dispatch(setCart(newCartData));
      try {
        await CartService.updateCart('/api/cart/update', {
          userId: user?.id,
          productId: item.productId,
          quantity: newQty,
        });
      } catch (error) {
        console.log('Error updating cart: ', error);
      }
    } else {
      const newCartData = cart.filter(
        cartProd => cartProd.productId !== item.productId,
      );
      dispatch(setCart(newCartData));
      try {
        await CartService.removeFromCart('/api/cart/remove', {
          userId: user?.id,
          productId: existingProduct.productId,
        });
      } catch (error) {
        console.log('Error removing from cart: ', error);
      }
    }
  };

  const handleRemoveItem = async () => {
    const newCartData = cart.filter(
      (cartProd) => cartProd.productId !== item.productId
    );
    dispatch(setCart(newCartData));
    try {
      await CartService.removeFromCart('/api/cart/remove', {
        userId: user?.id,
        productId: item?.productId,
      });
    } catch (error) {
      console.log('Error removing from cart: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.productDetailsContainer}>
        <View style={styles.productDetails}>
          <Image
            source={
              imageError || !imageUri ? ImageSource.item1 : { uri: imageUri }
            }
            style={styles.productImage}
            onError={() => setImageError(true)}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.prodName}>{item.name}</Text>
            <Text fontSize={16} varient="semiBold" style={styles.discountedMRP}>
              ₹{item.price}{' '}
              <Text fontSize={12} varient="regular" style={styles.actualPrice}>
                ₹{item.originalPrice}
              </Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleRemoveItem}>
          <CrossIcon name={'cross'} size={20} color={colors.contentPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.dropDownAndCounterContainer}>
        <TouchableOpacity style={styles.dropDown}>
          <Text>500 g</Text>
          <DownArrowIcon
            name={'chevron-small-down'}
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>

        <View style={styles.counter}>
          <TouchableOpacity
            style={[styles.btn, styles.leftRadius]}
            onPress={handleDecreaseQuantity}
            activeOpacity={0.8}
          >
            <Image source={ImageSource.minusWhite} />
          </TouchableOpacity>
          <View style={styles.countValueContainer}>
            <Text style={styles.qty}>{item.quantity}</Text>
          </View>
          <TouchableOpacity
            style={[styles.btn, styles.rightRadius]}
            onPress={handleIncreaseQuantity}
            activeOpacity={0.8}
          >
            <Image source={ImageSource.plusWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Card;
