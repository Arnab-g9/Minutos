import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './OTPScreen.styles';
import regularExpressions from '../../../../constants/regularExpressions';
import PrimaryHeader from '../../../../components/Header/PrimaryHeader/PrimaryHeader';
import TextWithLinkButton from '../../../../components/Button/TextWithLinkButton/TextWithLinkButton';
import PrimaryButton from '../../../../components/Button/PrimaryButton/PrimaryButton';
import { ScreenNames } from '../../../../navigation/stack/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { postData } from '../../../../api/api';
import { setAuthToken, setLogin, setUser } from '../../slice/Authslice';

const OTPScreen = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [showTimer, setShowTimer] = useState<{
    visible: boolean;
    time: number;
  }>({
    visible: false,
    time: 30,
  });
  const { phoneNumber } = useSelector((store: RootState) => store.auth);

  const inputs = useRef<(TextInput | null)[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useStyles(colors, insets);
  const dispatch = useDispatch();

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
    index: number,
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

  const handleSubmit = async () => {
    console.log("handle submit of otp screen called ==>")
    const enteredOtp = otp.join('');
    console.log('This is Otp ==>', enteredOtp);
    const cred = {
      phoneNumber: "+91"+phoneNumber,
      otp: enteredOtp,
    };
    console.log("this is cred ===>", cred);
    try {
      const res = await postData('/auth/verify-otp', cred);
      console.log("this is response of handle submit otp ===>", res)
      if(res?.data?.success){
        dispatch(setAuthToken(res?.data?.token));
        dispatch(setUser(res?.data?.user));
        dispatch(setLogin(true));
        navigation.navigate(ScreenNames.DASHBOARD_SCREEN as never);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
        ref={ref => initializeTextInputRef(ref, index)}
        value={digit}
        onChangeText={text => handleChange(text, index)}
        onKeyPress={e => handleKeyPress(e, index)}
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

  const isOtpComplete = otp.every(digit => digit !== '');

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
  }, [showTimer.time, showTimer.visible]);

  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      handleSubmit();
    }
  }, [otp]);

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
          <Text style={styles.title}>{'Verify Phone Number'}</Text>
          <Text style={styles.subtitle}>{'Enter your OTP'}</Text>
          <View style={styles.otpcontainer}>{renderOtpInputs()}</View>

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
            disabled={!isOtpComplete}
            containerStyle={styles.cta}
            onPress={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPScreen;
