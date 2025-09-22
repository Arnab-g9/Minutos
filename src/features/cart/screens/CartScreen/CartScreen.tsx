import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './CartScreen.styles';
import DashboardHeader from '../../../dashboard/components/DashboardHeader/DashboardHeader';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/Header';
import Label from '../../components/Label/Label';
import { ImageSource } from '../../../../constants/assets/Images';
import Card from '../../components/Card/Card';
import ConfermationModal from '../../../../components/Modal/ConfermationModal/ConfermationModal';

interface ICartItem {
  id: number;
  image: any;
  weight: string[];
  price: number;
  discountPrice: number;
}

  const cartdata:ICartItem[] = [
    {
      id: 1,
      image: ImageSource.item1,
      weight: ['500g', '1kg', '1.5kg', '2kg'],
      price: 25,
      discountPrice: 24,
    },
    {
      id: 2,
      image: ImageSource.item1,
      weight: ['500g', '1kg', '1.5kg', '2kg'],
      price: 25,
      discountPrice: 24,
    },{
      id: 3,
      image: ImageSource.item1,
      weight: ['500g', '1kg', '1.5kg', '2kg'],
      price: 25,
      discountPrice: 24,
    },{
      id: 4,
      image: ImageSource.item1,
      weight: ['500g', '1kg', '1.5kg', '2kg'],
      price: 25,
      discountPrice: 24,
    },{
      id: 5,
      image: ImageSource.item1,
      weight: ['500g', '1kg', '1.5kg', '2kg'],
      price: 25,
      discountPrice: 24,
    },{
      id: 6,
      image: ImageSource.item1,
      weight: ['500g', '1kg', '1.5kg', '2kg'],
      price: 25,
      discountPrice: 24,
    },{
      id: 7,
      image: ImageSource.item1,
      weight: ['500g', '1kg', '1.5kg', '2kg'],
      price: 25,
      discountPrice: 24,
    },
  ];

const CartScreen = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const navigation = useNavigation();

  const [showConfermationModal, setShowConfermationModal] = useState<boolean>(false);
  const handlePressBtn = ()=>{
    setShowConfermationModal(true);
  }
  const onDismissConfermationModal = ()=>{
    setShowConfermationModal(false)
  }

  console.log("this is the state of onconfirm click ===>", showConfermationModal)

  useEffect(() => {
    const renderHeader = () => (
      <>
        <Header onPressBtn={handlePressBtn}  />
        <Label />
      </>
    );
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [navigation]);



  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
        {
            cartdata.map((product, index)=><Card />)
        }
        <ConfermationModal visible={showConfermationModal} onConfirm={onDismissConfermationModal} onDecline={onDismissConfermationModal} />
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
