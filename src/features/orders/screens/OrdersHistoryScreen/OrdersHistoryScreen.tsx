import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
} from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './OrdersHistoryScreen.styles';
import { default as Text } from '../../../../components/Text/MSText';
import Header from '../../../cart/components/Header/Header';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import NoDataFound from '../../../../components/NoDataFound/NoDataFound';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrderService from '../../../checkout/service/OrderService';
import { Toast } from 'toastify-react-native';

export interface IOrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IShippingAddress {
  phone: string;
  city: string;
  state: string;
  pincode: string;
  street?: string;
}

export interface IVendor {
  _id: string;
  phone: string;
  businessName: string;
}

export interface IOrder {
  _id: string;
  user: string;
  vendor: IVendor;
  items: IOrderItem[];
  totalAmount: number;
  shippingAddress: IShippingAddress;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const OrdersHistoryScreen = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const navigation = useNavigation();
  const { user } = useSelector((state: RootState) => state.auth);

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const renderHeader = () => <Header title="My Orders" />;
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [navigation]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const response = await OrderService.getOrders(`/api/order/my-orders`);
      if (response?.success && response?.orders) {
        setOrders(response.orders);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch orders',
          position: 'bottom',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch orders',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderOrderCard = ({ item }: { item: IOrder }) => (
    <OrderCard order={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchOrders}
        ListEmptyComponent={() => (
          <NoDataFound message="No orders found. Start shopping!" />
        )}
      />
    </View>
  );
};

export default OrdersHistoryScreen;
