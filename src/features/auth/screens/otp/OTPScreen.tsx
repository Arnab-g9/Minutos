import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './OTPScreen.styles';
import regularExpressions from '../../../../constants/regularExpressions';
import PrimaryHeader from '../../../../components/Header/PrimaryHeader/PrimaryHeader';
import TextWithLinkButton from '../../../../components/Button/TextWithLinkButton/TextWithLinkButton';
import PrimaryButton from '../../../../components/Button/PrimaryButton/PrimaryButton';
import { ScreenNames } from '../../../../navigation/stack/constants';


const OTPScreen = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [showTimer, setShowTimer] = useState<{ visible: boolean; time: number }>({
    visible: false,
    time: 30,
  });

  const inputs = useRef<(TextInput | null)[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useStyles(colors, insets);
  // const dispatch = useDispatch();

  const handleChange = (text: string, index: number) => {
    if (!regularExpressions.ONLY_DIGITS.test(text) && text !== '') return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== '' && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };


  // const handleSubmit = async () => {
  //   const enteredOtp = otp.join('');
  //   const phoneNumber = storage.getString(StorageKeys.USER_PHONE_NUMBER) || '';

  //   try {
  //     const response = await verifyOtp(phoneNumber, enteredOtp);

  //     Toast.show({
  //       type: response.success ? Localization.VerifyOtpScreen_Success : Localization.VerifyOtpScreen_Error,
  //       text1: response.success
  //         ? Localization.VerifyOtpScreen_Toast_Text1_Success
  //         : Localization.VerifyOtpScreen_Toast_Text1_Error,
  //       text2: response.success
  //         ? Localization.VerifyOtpScreen_Toast_Text2_Success
  //         : Localization.VerifyOtpScreen_Toast_Text2_Error,
  //       swipeable: true,
  //       visibilityTime: 1500,
  //     });

  //     if (response.success && typeof response.token === "string") {
  //       const decoded = decodeJwt(response.token);

  //       if (decoded) {
  //         storage.set(StorageKeys.AUTH_ACCESS_TOKEN, response.token);
  //         storage.set(StorageKeys.JWT_EXPIRY, decoded.exp.toString());
  //         storage.set(StorageKeys.USER_ID, decoded.userId);
  //         storage.set(
  //           StorageKeys.USER_EXISTS,
  //           decoded.doesUserExists ? 'true' : 'false'
  //         );

  //         dispatch(setLogin(true));
  //         storage.set(StorageKeys.HAS_OTP_VERIFIED, true);
  //         navigation.navigate(ScreenNames.SEARCH_SCHOOL_SCREEN as never);
  //       } else {
  //         console.error("wrror --> invalid token");
  //       }
  //     } else {
  //       storage.set(StorageKeys.HAS_OTP_VERIFIED, false);
  //     }
  //   } catch (error) {
  //     console.error("Something went wrong")
  //   }
  // };

  const handlePressCta = () => {
    navigation.navigate(ScreenNames.DASHBOARD_SCREEN as never);
  }


  const handleResend = () => {
    setShowTimer({ visible: true, time: 30 });
  };

  const initializeTextInputRef = (ref: TextInput | null, index: number) => {
    inputs.current[index] = ref;
  };

  const renderOtpInputs = () =>
    otp.map((digit, index) => (
      <TextInput
        key={index}
        ref={(ref) => initializeTextInputRef(ref, index)}
        value={digit}
        onChangeText={(text) => handleChange(text, index)}
        onKeyPress={(e) => handleKeyPress(e, index)}
        keyboardType="number-pad"
        maxLength={1}
        autoFocus={index === 0}
        returnKeyType="next"
        style={[
          styles.otpInput,
          digit.length > 0 && styles.activeOtpInput,
          index === otp.length - 1 && styles.otpInputLast,
        ]}
      />
    ));

  const isOtpComplete = otp.every((digit) => digit !== '');


  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    ;
    if (showTimer.visible && showTimer.time > 0) {
      timer = setTimeout(() => {
        setShowTimer((prev) => ({ ...prev, time: prev.time - 1 }));
      }, 1000);
    } else if (showTimer.time === 0) {
      setShowTimer({ visible: false, time: 0 });
    }
    return () => clearTimeout(timer);
  }, [showTimer.time, showTimer.visible]);

  useEffect(() => {
    if (otp.every((digit) => digit !== '')) {
      // handleSubmit();
    }
  }, [otp]);

  useEffect(() => {
    const renderAppHeader = () => <SafeAreaView style={styles.header} />;
    navigation.setOptions({
      headerShown: true,
      header: renderAppHeader,
    });
  }, [navigation, styles.header]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.bottom + 80 : 0}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{"Verify Phone Number"}</Text>
          <Text style={styles.subtitle}>{"Enter your OTP"}</Text>
          <View style={styles.otpcontainer}>{renderOtpInputs()}</View>

          <TextWithLinkButton
            text={
              showTimer.visible
                ? "Try again after :"
                : "Didn't receive OTP?"
            }
            link={
              showTimer.visible
                ? `${showTimer.time}s`
                : "Resend again"
            }
            onPress={handleResend}
            disabled={showTimer.visible}
          />

          <View style={styles.spacer} />
          <PrimaryButton
            title={"Continue"}
            disabled={!isOtpComplete}
            containerStyle={styles.cta}
            onPress={handlePressCta}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPScreen;
