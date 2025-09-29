import { Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './Card.styles';
import { ImageSource } from '../../../../constants/assets/Images';
import { default as Text } from '../../../../components/Text/MSText';
import DownArrowIcon from 'react-native-vector-icons/Entypo';
import CrossIcon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../slice/CartSlice';
import { ICartItem } from '../../slice/CartSlice';
import { RootState } from '../../../../store/store';

interface props {
  item: ICartItem
}

const Card = ({ item }: props) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.cart.find(i => i._id === item._id)
  );

  const quantity = cartItem?.quantity || 0;

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      dispatch(addToCart({ ...item, quantity: 1 })); // slice increments
    }
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      dispatch(addToCart({ ...item, quantity: -1 })); // slice decrements
    } else if (quantity === 1) {
      dispatch(removeFromCart(item._id));
    }
  }

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item._id));
  }

  return (
    <View style={styles.container}>
      <View style={styles.productDetailsContainer}>
        <View style={styles.productDetails}>
          <Image source={ImageSource.item1} />
          <View>
            <Text style={styles.prodName}>{item.name}</Text>
            <Text fontSize={16} varient="semiBold" style={styles.discountedMRP}>
              ₹{item.discountedMRP}{' '}
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
          <DownArrowIcon name={'chevron-small-down'} size={20} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.counter}>
          <TouchableOpacity style={[styles.btn, styles.leftRadius]} onPress={handleDecreaseQuantity} activeOpacity={0.8}>
            <Image source={ImageSource.minusWhite} />
          </TouchableOpacity>
          <View style={styles.countValueContainer}>
            <Text style={styles.qty}>{quantity}</Text>
          </View>
          <TouchableOpacity style={[styles.btn, styles.rightRadius]} onPress={handleIncreaseQuantity} activeOpacity={0.8}>
            <Image source={ImageSource.plusWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Card;
