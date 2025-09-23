import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../../theme/ThemeProvider'
import { useStyles } from './LoginScreen.styles';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {default as Text} from '../../../../components/Text/MSText'
import { useNavigation } from '@react-navigation/native';
import { getInfoTextColorBasedOnError, invalidPhoneNumberErrorMessage, isValidIndianPhoneNumber } from '../../utils/helper';
import PrimaryButton from '../../../../components/Button/PrimaryButton/PrimaryButton';
import Header from '../../../cart/components/Header/Header';
import { ScreenNames } from '../../../../navigation/stack/constants';

const LoginScreen = () => {
      const [inputPhoneNumber, setInputPhoneNumber] = useState('9876543210');
       const [phoneNumberError, setPhoneNumberError] = useState({
        incomplete: false, invalid: false, valid: false,
    });
    const {colors} = useTheme();
    const insets = useSafeAreaInsets();
    const styles = useStyles(colors, insets);
    const navigation = useNavigation();

    const onChangeText = (phno:string)=>{
        setInputPhoneNumber(phno)
        validateText(phno);
    }

    const validateText = (text: string) => {
        const { incomplete, invalid, valid } = isValidIndianPhoneNumber(text);
        setPhoneNumberError({
            incomplete: !!incomplete,
            invalid: !!invalid,
            valid: !!valid,
        });
    };

    const onPressCta = async () => {
        navigation.navigate(ScreenNames.DASHBOARD_SCREEN as never);
    };

    useEffect(() => {
        const renderAppHeader = () => <View style={styles.emptyHeader} />;
        navigation.setOptions({
            headerShown: true,
            header: renderAppHeader,
        });
    }, []);

    useEffect(() => {
        // const phoneNumber = storage.getString(StorageKeys.USER_PHONE_NUMBER);
        // if (phoneNumber) {
        //     setInputPhoneNumber(phoneNumber);
        //     validateText(phoneNumber);
        // }
    }, []);

  return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingViewContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? insets.bottom + 80 : 0}
            >
                 <View style={styles.innerContainer}>
                    <Text style={styles.title}>Get started</Text>
                    <Text style={styles.subtitle}>Enter your Phone Number to get started</Text>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.defaultCountryCode}>
                           +91
                        </Text>
                        <TextInput
                            value={inputPhoneNumber}
                            cursorColor={colors.contentPrimary}
                            style={styles.textInput}
                            placeholder={"Enter your phone number"}
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
                            { color: getInfoTextColorBasedOnError(phoneNumberError.invalid, colors) },
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
                        title={"Continue"}
                        disabled={
                            phoneNumberError.incomplete ||
                            phoneNumberError.invalid ||
                            !phoneNumberError.valid
                        }
                        containerStyle={styles.ctaContainer}
                        onPress={onPressCta}
                    />
                </View>
            </KeyboardAvoidingView>
            </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})