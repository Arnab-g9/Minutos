import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './OTPScreen.styles';
import TextWithLinkButton from '../../../../components/Button/TextWithLinkButton/TextWithLinkButton';
import PrimaryButton from '../../../../components/Button/PrimaryButton/PrimaryButton';
import { ScreenNames } from '../../../../navigation/stack/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { postData } from '../../../../api/api';
import { setAuthToken, setLogin, setUser } from '../../slice/Authslice';
import AuthService from '../../service/AuthService';
import { Toast } from 'toastify-react-native';
import { OtpInput } from 'react-native-otp-entry';
import axios from 'axios';

const OTPScreen = () => {
  const [otp, setOtp] = useState('');
  const [showTimer, setShowTimer] = useState<{
    visible: boolean;
    time: number;
  }>({
    visible: false,
    time: 30,
  });
  const { phoneNumber } = useSelector((store: RootState) => store.auth);

  const navigation = useNavigation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useStyles(colors, insets);
  const dispatch = useDispatch();

  const handleSubmit = async (otp: string) => {
    console.log("handle submit called ===>", otp);
    if (otp.length < 6) return;
    console.log('handle submit of otp screen called ==>');
    const cred = {
      phoneNumber: '+91' + phoneNumber,
      otp,
    };
    console.log('this is cred ===>', cred);
    try {
      let res = await postData(
        '/api/auth/verify-otp',
        cred,
      );
      console.log('this is response of handle submit otp ===>', res);
      if (res?.data?.success) {
        dispatch(setAuthToken(res?.data?.token));
        dispatch(setUser(res?.data?.user));
        dispatch(setLogin(true));
        navigation.navigate(ScreenNames.DASHBOARD_SCREEN as never);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleResend = async () => {
    setShowTimer({ visible: true, time: 30 });
    const sendPhoneObj = { phoneNumber: '+91' + phoneNumber };
    try {
      const res = await AuthService.sendOTP('/auth/send-otp', sendPhoneObj);
      if (res?.success) {
        Toast.show({
          type: 'success',
          text1: 'OTP Sent',
          text2: res?.data?.message,
          position: 'bottom',
          visibilityTime: 1500,
          autoHide: true,
        });
        navigation.navigate(ScreenNames.OTP_SCREEN as never);
      }
    } catch (error) {
      console.error('Error happen: ', error);
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showTimer.visible && showTimer.time > 0) {
      timer = setTimeout(() => {
        setShowTimer(prev => ({ ...prev, time: prev.time - 1 }));
      }, 1000);
    } else if (showTimer.time === 0) {
      setShowTimer({ visible: false, time: 0 });
    }
    return () => clearTimeout(timer);
  }, [showTimer]);

  useEffect(() => {
    const renderAppHeader = () => (
      <SafeAreaView
        style={{ backgroundColor: colors.background_primary }}
      ></SafeAreaView>
    );
    navigation.setOptions({
      headerShown: true,
      header: renderAppHeader,
    });
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.bottom + 80 : 0}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Verify Phone Number</Text>
          <Text style={styles.subtitle}>Enter your OTP</Text>

          {/* ✅ New OtpInput Component */}
          <OtpInput
            numberOfDigits={6}
            focusColor={colors.primary}
            autoFocus={true}
            hideStick={false}
            blurOnFilled={false}
            type="numeric"
            secureTextEntry={false}
            onTextChange={text => {
              console.log("This is text ===>", text);
              setOtp(text)
            }}
            onFilled={text => {
              setOtp(text);
              handleSubmit(text);
            }}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              containerStyle: styles.otpcontainer,
              pinCodeContainerStyle: styles.otpInput,
              focusedPinCodeContainerStyle: styles.activeOtpInput,
              filledPinCodeContainerStyle: styles.activeOtpInput,
            }}
          />

          <TextWithLinkButton
            text={
              showTimer.visible ? 'Try again after :' : "Didn't receive OTP?"
            }
            link={showTimer.visible ? `${showTimer.time}s` : 'Resend again'}
            onPress={handleResend}
            disabled={showTimer.visible}
          />

          <View style={styles.spacer} />
          <PrimaryButton
            title={'Continue'}
            disabled={otp.length < 6}
            containerStyle={styles.cta}
            onPress={() => handleSubmit(otp)}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPScreen;
