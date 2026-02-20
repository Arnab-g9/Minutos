import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './ProfileScreen.styles';
import { useNavigation } from '@react-navigation/native';
import PrimaryHeader from '../../../../components/Header/PrimaryHeader/PrimaryHeader';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import { IconsName } from '../../../../constants/assets/Icons';
import { default as Text } from '../../../../components/Text/MSText';
import Card from '../../components/Card/Card';
import OrderIcon from 'react-native-vector-icons/Feather';
import SupportIcon from 'react-native-vector-icons/MaterialIcons';
import ProfileIcon from 'react-native-vector-icons/FontAwesome6';
import LogoutIcon from 'react-native-vector-icons/AntDesign';
import NavItem from '../../components/NavItem/NavItem';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../auth/slice/Authslice';
import { RootState } from '../../../../store/store';
import { Switch } from 'react-native-switch';
import SunIcon from 'react-native-vector-icons/Feather'
import MoonIcon from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenNames } from '../../../../navigation/stack/constants';

const infoArr = [
  {
    name: 'Refunds',
  },
  {
    name: 'Saved Addresses',
  },
  {
    name: 'Payment Management',
  },
];

// const otherInfoArr = [
//   {
//     name: 'Suggest Products',
//   },
//   {
//     name: 'Notifications',
//   },
//   {
//     name: 'General Info',
//   },
// ];

const ProfileScreen = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const { colors, mode, toggleTheme } = useTheme();
  const styles = useStyles(colors);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleToggleSwitch = () => {
    setIsEnabled(prev => !prev);
    toggleTheme();
  }

  useEffect(() => {
    setIsEnabled(mode === 'light' ? false : true)
  }, [])

  useEffect(() => {
    const renderHeader = () => <PrimaryHeader title="Settings" />;
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [navigation]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        {/* Profile Icon and Details Section */}
        <View style={styles.nameAndProfileimageContainer}>
          <View style={styles.imageContainer}>
            <UserIcon
              name={IconsName.userIcon}
              size={70}
              color={colors.primary}
            />
          </View>
          {/* Profile Image and details container */}
          <View>
            <Text varient="bold" fontSize={20} style={styles.useName}>
              Guest Name
            </Text>
            <Text style={styles.phNo} varient="medium">
              {user?.phoneNumber}
            </Text>
          </View>
          {/* switch */}
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <SunIcon name={'sun'} size={20} color={mode === 'light' ? colors.contentPrimary : colors.primaryCtaText} />
              <Switch
                value={isEnabled}
                onValueChange={handleToggleSwitch}
                circleSize={20}
                barHeight={22}
                backgroundInactive={colors.contentDisabled}
                backgroundActive={colors.primary}
                renderActiveText={false}
                renderInActiveText={false}
                changeValueImmediately
                circleBorderWidth={2}
                innerCircleStyle={styles.circleStyle}
                outerCircleStyle={styles.circleStyle}
                circleBorderActiveColor={colors.primary}
                circleBorderInactiveColor={colors.contentDisabled}
              />
              <MoonIcon name={'moon'} size={20} color={mode === 'light' ? colors.contentPrimary : colors.primaryCtaText} />
            </View>
          </View>

        </View>
        {/* options */}
        <View style={styles.optionsContainer}>
          <Card
            onPress={() => navigation.navigate(ScreenNames.ORDERS_HISTORY_SCREEN as never)}
            renderIcon={() => (
              <OrderIcon
                name={IconsName.orderIcon}
                size={30}
                color={colors.primary}
              />
            )}
            title={'Your Orders'}
          />
          <Card
            renderIcon={() => (
              <SupportIcon
                name={IconsName.supportIcon}
                size={30}
                color={colors.primary}
              />
            )}
            title={'Help & Support'}
          />
          <Card
            renderIcon={() => (
              <ProfileIcon
                name={IconsName.profileIcon}
                size={30}
                color={colors.primary}
              />
            )}
            title={'Profile'}
          />
        </View>
        <Text varient="bold" fontSize={18} style={{ marginTop: 50, color: colors.contentPrimary }}>
          Your Information
        </Text>
        <View style={styles.infoContainer}>
          {infoArr.map((item, index) => (
            <NavItem item={item} isLast={index === infoArr.length - 1} />
          ))}
        </View>

      </ScrollView>
      <View style={{ paddingHorizontal: 16 }}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            borderRadius: 12,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
            flexDirection: 'row',
            gap: 15,
            shadowColor: "red",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
            marginBottom: 20
          }}
        >
          <LogoutIcon name="logout" size={20} color={colors.primaryCtaText} />
          <Text
            fontSize={16}
            varient="semiBold"
            style={{ color: colors.primaryCtaText }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
