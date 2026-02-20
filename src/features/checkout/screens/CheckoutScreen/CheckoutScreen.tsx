import React, { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './CheckoutScreen.styles';
import { default as Text } from '../../../../components/Text/MSText';
import Header from '../../../cart/components/Header/Header';
import PrimaryButton from '../../../../components/Button/PrimaryButton/PrimaryButton';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../../store/store';
import { setCart } from '../../../cart/slice/CartSlice';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../../navigation/stack/constants';
import DownArrowIcon from 'react-native-vector-icons/Entypo';
import CheckIcon from 'react-native-vector-icons/Feather';
import { IVendor } from '../../slice/VendorSlice';
import OrderService from '../../service/OrderService';
import { Toast } from 'toastify-react-native';
import { useSelector } from 'react-redux';

const PAYMENT_OPTIONS = [
  { id: 'CARD', label: 'Credit / Debit Card' },
  { id: 'UPI', label: 'UPI' },
  { id: 'COD', label: 'Cash on Delivery' },
] as const;

type PaymentId = (typeof PAYMENT_OPTIONS)[number]['id'];

const CheckoutScreen = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { cart, totalPrice } = useSelector((state: RootState) => state.cart);
  const { vendors } = useSelector((state: RootState) => state.vendor);
  const { user } = useSelector((state: RootState) => state.auth);

  const [selectedVendor, setSelectedVendor] = useState<IVendor | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [remark, setRemark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentId | null>(null);

  const canProceedStep1 = !!selectedVendor;
  const canProceedStep2 =
    !!address.trim() && !!state.trim() && !!city.trim() && !!pincode.trim() && !!phone.trim();
  const canProceedStep3 = !!paymentMethod;
  const allStepsDone = canProceedStep1 && canProceedStep2 && canProceedStep3;
  const step = !selectedVendor ? 1 : !canProceedStep2 ? 2 : !paymentMethod ? 3 : 3;

  useEffect(() => {
    const renderHeader = () => <Header title="Checkout" />;
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [navigation]);

  console.log("this is cart data inside the Checkoutscreen ===>", cart)

  const handlePlaceOrder = async () => {
    if (!selectedVendor || !allStepsDone) return;

    setIsPlacingOrder(true);
    try {
      const paymentMethodMap: Record<PaymentId, string> = {
        CARD: 'card',
        UPI: 'upi',
        COD: 'cod',
      };

      const orderPayload = {
        vendorId: selectedVendor._id,
        items: cart.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
        shippingAddress: {
          street: address,
          city: city,
          state: state,
          pincode: pincode,
          phone: phone,
        },
        paymentMethod: paymentMethodMap[paymentMethod!],
      };

      console.log("this is orderpayload ===>", orderPayload)

      const response = await OrderService.createOrder('/api/order/create', orderPayload);
      console.log("this is orderService ===>", response);

      if (response?.success) {
        Toast.show({
          type: 'success',
          text1: 'Order Placed',
          text2: 'Your order has been placed successfully!',
          position: 'bottom',
          visibilityTime: 2000,
        });
        dispatch(setCart([]));
        navigation.navigate(ScreenNames.ORDERS_HISTORY_SCREEN as never);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Order Failed',
          text2: response?.message || 'Failed to place order',
          position: 'bottom',
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to place order. Please try again.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const renderStepper = () => (
    <View style={styles.stepperContainer}>
      {[1, 2, 3].map((s) => (
        <React.Fragment key={s}>
          <View style={styles.stepItem}>
            <View
              style={[
                styles.stepCircle,
                step > s && styles.stepCircleCompleted,
                step === s && styles.stepCircleActive,
              ]}
            >
              {step > s ? (
                <CheckIcon name="check" size={18} color={colors.primaryCtaText} />
              ) : (
                <Text
                  fontSize={14}
                  varient="semiBold"
                  style={{
                    color:
                      step === s
                        ? colors.primaryCtaText
                        : colors.contentSecondary,
                  }}
                >
                  {s}
                </Text>
              )}
            </View>
            <Text
              fontSize={11}
              numberOfLines={1}
              style={[
                styles.stepLabel,
                {
                  color:
                    step >= s ? colors.contentPrimary : colors.contentTertiary,
                },
              ]}
            >
              {s === 1 ? 'Vendor' : s === 2 ? 'Address' : 'Payment'}
            </Text>
          </View>
          {s < 3 && (
            <View
              style={[styles.stepLine, step > s && styles.stepLineActive]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.section}>
      <Text
        varient="semiBold"
        fontSize={16}
        style={[styles.sectionTitle, { color: colors.contentPrimary }]}
      >
        Select Vendor
      </Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowVendorModal(true)}
        activeOpacity={0.8}
      >
        <Text
          fontSize={14}
          style={{
            color: selectedVendor ? colors.contentPrimary : colors.contentTertiary,
          }}
        >
          {selectedVendor?.businessName || 'Select vendor'}
        </Text>
        <DownArrowIcon
          name="chevron-small-down"
          size={24}
          color={colors.primary}
        />
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.section}>
      <Text
        varient="semiBold"
        fontSize={16}
        style={[styles.sectionTitle, { color: colors.contentPrimary }]}
      >
        Delivery Address
      </Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Street / House / Flat"
        placeholderTextColor={colors.contentTertiary}
        value={address}
        onChangeText={setAddress}
        multiline
      />
      <View style={styles.row}>
        <View style={styles.rowField}>
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor={colors.contentTertiary}
            value={city}
            onChangeText={setCity}
          />
        </View>
          <View style={styles.rowField}>
          <TextInput
            style={styles.input}
            placeholder="State"
            placeholderTextColor={colors.contentTertiary}
            value={state}
            onChangeText={setState}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.rowField}>
          <TextInput
            style={styles.input}
            placeholder="Pin code"
            placeholderTextColor={colors.contentTertiary}
            value={pincode}
            onChangeText={setPincode}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.rowField}>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor={colors.contentTertiary}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
      </View>
      <View style={styles.lastInputContainer}>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Remark (Optional)"
          placeholderTextColor={colors.contentTertiary}
          value={remark}
          onChangeText={setRemark}
          multiline
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.paymentSection}>
      <Text
        varient="semiBold"
        fontSize={16}
        style={[styles.sectionTitle, { color: colors.contentPrimary }]}
      >
        Payment Method
      </Text>
      {PAYMENT_OPTIONS.map((opt) => {
        const isActive = paymentMethod === opt.id;
        return (
          <TouchableOpacity
            key={opt.id}
            style={[styles.paymentOption, isActive && styles.paymentOptionActive]}
            onPress={() => setPaymentMethod(opt.id)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.paymentRadio,
                isActive && styles.paymentRadioActive,
              ]}
            >
              {isActive && <View style={styles.paymentRadioInner} />}
            </View>
            <Text
              fontSize={14}
              varient="medium"
              style={{ color: colors.contentPrimary }}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderOrderSummary = () => (
    <View style={styles.orderSummarySection}>
      <Text
        varient="semiBold"
        fontSize={16}
        style={[styles.sectionTitle, { color: colors.contentPrimary }]}
      >
        Order Summary
      </Text>
      <View style={styles.orderSummaryCard}>
        {cart?.map((item) => (
          <View key={item._id} style={styles.orderSummaryRow}>
            <Text
              fontSize={14}
              numberOfLines={1}
              style={{ flex: 1, color: colors.contentPrimary }}
            >
              {item.name} × {item.quantity}
            </Text>
            <Text fontSize={14} style={{ color: colors.contentPrimary }}>
              ₹{(item.lineTotal ?? item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        <View style={styles.orderSummaryTotal}>
          <Text varient="semiBold" fontSize={16} style={{ color: colors.contentPrimary }}>
            Total
          </Text>
          <Text varient="semiBold" fontSize={16} style={{ color: colors.primary }}>
            ₹{typeof totalPrice === 'number' ? totalPrice.toFixed(2) : '0.00'}
          </Text>
        </View>
      </View>
      <PrimaryButton
        title={`Place Order · ₹${typeof totalPrice === 'number' ? totalPrice.toFixed(2) : '0.00'}`}
        onPress={handlePlaceOrder}
        disabled={!allStepsDone || isPlacingOrder}
        showLoader={isPlacingOrder}
        containerStyle={styles.placeOrderBtn}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderStepper()}
        {step >= 1 && renderStep1()}
        {step >= 2 && renderStep2()}
        {step >= 3 && renderStep3()}
        {renderOrderSummary()}
      </ScrollView>

      <Modal
        transparent
        visible={showVendorModal}
        animationType="fade"
        onRequestClose={() => setShowVendorModal(false)}
      >
        <TouchableOpacity
          style={styles.vendorModalOverlay}
          activeOpacity={1}
          onPress={() => setShowVendorModal(false)}
        >
          <ScrollView
            style={styles.vendorModalContent}
            onStartShouldSetResponder={() => true}
            contentContainerStyle={{flexGrow:1}}
          >
            {vendors.length === 0 ? (
              <View style={styles.vendorOption}>
                <Text fontSize={16} style={{ color: colors.contentTertiary }}>
                  No vendors available
                </Text>
              </View>
            ) : (
              vendors.map((v) => (
                <TouchableOpacity
                  key={v._id}
                  style={styles.vendorOption}
                  onPress={() => {
                    setSelectedVendor(v);
                    setShowVendorModal(false);
                  }}
                >
                  <Text fontSize={16} varient="medium" style={{ color: colors.contentPrimary }}>
                    {v.businessName || `${v.firstName || ''} ${v.lastName || ''}`.trim() || 'Vendor'}
                  </Text>
                  {v.businessType && (
                    <Text fontSize={12} style={{ color: colors.contentTertiary, marginTop: 4 }}>
                      {v.businessType}
                    </Text>
                  )}
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;
