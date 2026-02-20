import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './OrderCard.styles';
import { default as Text } from '../../../../components/Text/MSText';
import { IOrder } from '../../screens/OrdersHistoryScreen/OrdersHistoryScreen';
import StoreIcon from 'react-native-vector-icons/Feather';
import LocationIcon from 'react-native-vector-icons/Ionicons';
import CalendarIcon from 'react-native-vector-icons/Feather';

interface Props {
  order: IOrder;
}

const OrderCard = ({ order }: Props) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PLACED':
        return colors.primary;
      case 'CONFIRMED':
        return colors.contentGreen;
      case 'DELIVERED':
        return colors.contentGreen;
      case 'CANCELLED':
        return colors.contentSecondary;
      default:
        return colors.contentPrimary;
    }
  };

  return (
    <View style={styles.card}>
      {/* Header Section */}
      <View style={styles.cardHeader}>
        <View style={styles.orderIdContainer}>
          <Text fontSize={11} style={{ color: colors.contentTertiary }}>
            Order ID
          </Text>
          <Text fontSize={15} varient="semiBold" style={{ color: colors.contentPrimary, marginTop: 2 }}>
            #{order._id.slice(-8).toUpperCase()}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
          <Text fontSize={12} varient="semiBold" style={{ color: getStatusColor(order.status) }}>
            {order.status}
          </Text>
        </View>
      </View>

      {/* Vendor Section */}
      <View style={styles.vendorContainer}>
        <View style={styles.vendorInfo}>
          <StoreIcon name="store" size={16} color={colors.primary} />
          <View style={styles.vendorDetails}>
            <Text fontSize={13} varient="medium" style={{ color: colors.contentPrimary }}>
              {order.vendor.businessName}
            </Text>
            <Text fontSize={11} style={{ color: colors.contentTertiary, marginTop: 2 }}>
              {order.vendor.phone}
            </Text>
          </View>
        </View>
      </View>

      {/* Items Section */}
      <View style={styles.itemsContainer}>
        <Text fontSize={12} varient="medium" style={{ color: colors.contentTertiary, marginBottom: 12 }}>
          Items ({order.items.length})
        </Text>
        {order.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <View style={styles.itemQuantityBadge}>
                <Text fontSize={11} varient="medium" style={{ color: colors.primaryCtaText }}>
                  {item.quantity}
                </Text>
              </View>
              <Text fontSize={14} style={{ flex: 1, color: colors.contentPrimary, marginLeft: 10 }}>
                {item.name}
              </Text>
            </View>
            <Text fontSize={14} varient="semiBold" style={{ color: colors.contentPrimary }}>
              ₹{(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Address Section */}
      <View style={styles.addressContainer}>
        <View style={styles.addressHeader}>
          <LocationIcon name="location-outline" size={14} color={colors.contentTertiary} />
          <Text fontSize={12} varient="medium" style={{ color: colors.contentTertiary, marginLeft: 6 }}>
            Delivery Address
          </Text>
        </View>
        <Text fontSize={13} style={{ color: colors.contentPrimary, marginTop: 8, lineHeight: 18 }}>
          {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
        </Text>
        <Text fontSize={12} style={{ color: colors.contentTertiary, marginTop: 6 }}>
          Phone: {order.shippingAddress.phone}
        </Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={styles.dateContainer}>
          <CalendarIcon name="calendar" size={12} color={colors.contentTertiary} />
          <View style={{ marginLeft: 6 }}>
            <Text fontSize={11} style={{ color: colors.contentTertiary }}>
              {formatDate(order.createdAt)}
            </Text>
            <Text fontSize={10} style={{ color: colors.contentQuaternary, marginTop: 2 }}>
              {formatTime(order.createdAt)}
            </Text>
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text fontSize={13} varient="medium" style={{ color: colors.contentTertiary, marginRight: 8 }}>
            Total:
          </Text>
          <Text fontSize={20} varient="bold" style={{ color: colors.primary }}>
            ₹{order.totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;
