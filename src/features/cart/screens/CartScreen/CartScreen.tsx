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
import NoDataFound from '../../../../components/NoDataFound/NoDataFound';
import { setCart } from '../../slice/CartSlice';

const CartScreen = () => {
  const { colors } = useTheme();
  const { cart, totalPrice } = useSelector((store: RootState) => store.cart);
  const {currentAddress} = useSelector((store: RootState)=>store.dashboard);
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
    setShowConfermationModal(false);
    dispatch(setCart([]))
  }

  useEffect(() => {
    const renderHeader = () => (
      <>
        <Header onPressBtn={handlePressBtn} title={`Cart (${cart?.length})`} isCart />
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
          keyExtractor={(item) => item?.productId?._id?.toString?.() || item._id?.toString?.()}
          ListEmptyComponent={() => <NoDataFound message='Please add some product into the cart :)' />}
        />
      </View>
      {
        cart?.length > 0 && <View style={styles.slotAddressAndButtonContainer}>
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
              HOME <Text>- {currentAddress?.length! > 15 ? currentAddress?.slice(0, 15)+"..." : currentAddress}</Text>
            </Text>
            <View style={styles.changeAddressBtn}>
              {/* <Image source={ImageSource.location} /> */}
              <LocationIcon name={'location-outline'} size={20} color={colors.primary} />
              <Text style={styles.addressTxt}>CHANGE ADDRESS</Text>
            </View>
          </View>
          <View style={styles.payBtnConatiner}>
            <TouchableOpacity style={styles.payBtn}>
              <Text varient='semiBold' fontSize={16} style={styles.payBtnTxt}>
                Pay Now · Subtotal ₹{typeof totalPrice === 'number' ? totalPrice.toFixed(2) : '0.00'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      <ConfermationModal visible={showConfermationModal} onConfirm={onConfirmConfermationModal} onDecline={onDismissConfermationModal} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
