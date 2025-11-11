import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './LoginScreen.styles';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { default as Text } from '../../../../components/Text/MSText';
import { useNavigation } from '@react-navigation/native';
import {
  getInfoTextColorBasedOnError,
  invalidPhoneNumberErrorMessage,
  isValidIndianPhoneNumber,
} from '../../utils/helper';
import PrimaryButton from '../../../../components/Button/PrimaryButton/PrimaryButton';
import { ScreenNames } from '../../../../navigation/stack/constants';
import { fetchData, postData } from '../../../../api/api';
import { Toast } from 'toastify-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setPhoneNumber } from '../../slice/Authslice';
import AuthService from '../../service/AuthService';
import axios from 'axios';

const LoginScreen = () => {
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState({
    incomplete: false,
    invalid: false,
    valid: false,
  });
  const [showLoader, setShowLoader] = useState(false);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useStyles(colors, insets);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onChangeText = (phno: string) => {
    setInputPhoneNumber(phno);
    validateText(phno);
  };

  const validateText = (text: string) => {
    const { incomplete, invalid, valid } = isValidIndianPhoneNumber(text);
    setPhoneNumberError({
      incomplete: !!incomplete,
      invalid: !!invalid,
      valid: !!valid,
    });
  };

  const onPressCta = async () => {
    handleSubmitPhoneNo();
  };

  useEffect(() => {
    const renderAppHeader = () => <SafeAreaView edges={['top']} style={styles.emptyHeader} />;
    navigation.setOptions({
      headerShown: true,
      header: renderAppHeader,
    });
  }, [navigation, styles.emptyHeader]);

  const handleSubmitPhoneNo = async () => {
    setShowLoader(true);
    const sendPhoneObj = {
      phoneNumber: '+91' + inputPhoneNumber,
    };
    dispatch(setPhoneNumber(inputPhoneNumber));
    try {
      // const res = await AuthService.sendOTP('api/auth/send-otp', sendPhoneObj);
      let res = await axios.post(
        'https://minutosa-3.onrender.com/api/auth/send-otp',
        sendPhoneObj,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      res = res.data;
      console.log("Response of get OTP ===>", res)
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
      console.error("Error:", error);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.bottom + 80 : 0}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Get started</Text>
          <Text style={styles.subtitle}>
            Enter your Phone Number to get started
          </Text>
          <View style={styles.textInputContainer}>
            <Text style={styles.defaultCountryCode}>+91</Text>
            <TextInput
              value={inputPhoneNumber}
              cursorColor={colors.contentPrimary}
              style={styles.textInput}
              placeholder={'Enter your phone number'}
              placeholderTextColor={colors.subtitle}
              autoFocus={true}
              keyboardType="phone-pad"
              maxLength={10}
              onChangeText={onChangeText}
            />
          </View>
          <Text
            style={[
              styles.inputInfoMessage,
              {
                color: getInfoTextColorBasedOnError(
                  phoneNumberError.invalid,
                  colors,
                ),
              },
            ]}
          >
            {invalidPhoneNumberErrorMessage({
              inputPhoneNumber,
              incomplete: phoneNumberError.incomplete,
              invalid: phoneNumberError.invalid,
            })}
          </Text>
          <View style={styles.spacer} />
          <PrimaryButton
            title={'Continue'}
            disabled={
              phoneNumberError.incomplete ||
              phoneNumberError.invalid ||
              !phoneNumberError.valid
            }
            containerStyle={styles.ctaContainer}
            onPress={onPressCta}
            showLoader={showLoader}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

