import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './CartScreen.styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/Header';
import Label from '../../components/Label/Label';
import { ImageSource } from '../../../../constants/assets/Images';
import Card from '../../components/Card/Card';
import ConfermationModal from '../../../../components/Modal/ConfermationModal/ConfermationModal';
import { default as Text } from '../../../../components/Text/MSText';
import LocationIcon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../../../store/store';
import { resetCart } from '../../slice/CartSlice';
import NoDataFound from '../../../../components/NoDataFound/NoDataFound';

// interface ICartItem {
//   id: number;
//   image: any;
//   weight: string[];
//   price: number;
//   discountPrice: number;
// }

// const cartdata: ICartItem[] = [
//   {
//     id: 1,
//     image: ImageSource.item1,
//     weight: ['500g', '1kg', '1.5kg', '2kg'],
//     price: 25,
//     discountPrice: 24,
//   },
//   {
//     id: 2,
//     image: ImageSource.item1,
//     weight: ['500g', '1kg', '1.5kg', '2kg'],
//     price: 25,
//     discountPrice: 24,
//   },
//   {
//     id: 3,
//     image: ImageSource.item1,
//     weight: ['500g', '1kg', '1.5kg', '2kg'],
//     price: 25,
//     discountPrice: 24,
//   },
//   {
//     id: 4,
//     image: ImageSource.item1,
//     weight: ['500g', '1kg', '1.5kg', '2kg'],
//     price: 25,
//     discountPrice: 24,
//   },
//   {
//     id: 5,
//     image: ImageSource.item1,
//     weight: ['500g', '1kg', '1.5kg', '2kg'],
//     price: 25,
//     discountPrice: 24,
//   },
//   {
//     id: 6,
//     image: ImageSource.item1,
//     weight: ['500g', '1kg', '1.5kg', '2kg'],
//     price: 25,
//     discountPrice: 24,
//   },
//   {
//     id: 7,
//     image: ImageSource.item1,
//     weight: ['500g', '1kg', '1.5kg', '2kg'],
//     price: 25,
//     discountPrice: 24,
//   },
// ];

const CartScreen = () => {
  const { colors } = useTheme();
  const { user, token } = useSelector((store: RootState) => store.auth)
  const { cart, totalPrice } = useSelector((store: RootState) => store.cart);
  const styles = useStyles(colors);
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const [showConfermationModal, setShowConfermationModal] =
    useState<boolean>(false);
  const handlePressBtn = () => {
    setShowConfermationModal(true);
  };
  const onDismissConfermationModal = () => {
    setShowConfermationModal(false);
  };
  const onConfirmConfermationModal = () => {
    dispatch(resetCart());
    setShowConfermationModal(false);
  }
  console.log("this is userId ===>", user?.id, token)
  useEffect(() => {
    const renderHeader = () => (
      <>
        <Header onPressBtn={handlePressBtn} title={`Cart (${cart.length})`} isCart />
        <Label />
      </>
    );
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [navigation, cart]);

  console.log('this is confermationModal ==>', showConfermationModal);

  return (
    <View style={styles.cartContainer}>
      <View style={{ flex: 1 }}>
        <FlatList data={cart} renderItem={({ item }) => <Card item={item} />} style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item) => item._id.toString()}
          ListEmptyComponent={() => <NoDataFound message='Please add some product into the cart :)' />}
        />
      </View>
      {
        cart.length > 0 && <View style={styles.slotAddressAndButtonContainer}>
          <View style={styles.slotContainer}>
            <View style={styles.titleAndSubTitleContainer}>
              <Text varient="medium" fontSize={16} style={styles.title}>
                {' '}
                Delivering to you in 15 mins!{' '}
              </Text>
              <Text fontSize={12} style={styles.subTitle}>
                Delivery time has slightly increase due to heavy rains.{' '}
              </Text>
            </View>
            <TouchableOpacity style={styles.slotBtn}>
              <Text fontSize={16} varient="medium" style={styles.slotBtnTxt}>
                Change Slot
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.addressTxt}>
              HOME <Text>- 4202, T 4, Sultan Bagh...</Text>
            </Text>
            <View style={styles.changeAddressBtn}>
              {/* <Image source={ImageSource.location} /> */}
              <LocationIcon name={'location-outline'} size={20} color={colors.primary} />
              <Text style={styles.addressTxt}>CHANGE ADDRESS</Text>
            </View>
          </View>
          <View style={styles.payBtnConatiner}>
            <TouchableOpacity style={styles.payBtn}>
              <Text varient='semiBold' fontSize={16} style={styles.payBtnTxt}>CONTINUE TO PAY ₹{totalPrice}</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
