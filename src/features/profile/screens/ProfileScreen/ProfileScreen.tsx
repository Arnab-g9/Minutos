import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
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

const infoArr = [
  {
    name: 'Your Orders',
  },
  {
    name: 'Help & Support',
  },
  {
    name: 'Refunds',
  },
  {
    name: 'Saved Addresses',
  },
  {
    name: 'Profile',
  },
  {
    name: 'Payment Management',
  },
];

const otherInfoArr = [
  {
    name: 'Suggest Products',
  },
  {
    name: 'Notifications',
  },
  {
    name: 'General Info',
  },
];

const ProfileScreen = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const navigation = useNavigation();
  useEffect(() => {
    const renderHeader = () => <PrimaryHeader title="Settings" />;
    navigation.setOptions({
      headerShown: true,
      header: renderHeader,
    });
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
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
          <Text varient="bold" fontSize={20}>
            Guest Name
          </Text>
          <Text style={styles.phNo} varient="medium">
            +919876543210
          </Text>
        </View>
      </View>
      {/* options */}
      <View style={styles.optionsContainer}>
        <Card
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

      <Text varient="bold" fontSize={18} style={{ marginTop: 50 }}>
        Your Information
      </Text>
      <View style={styles.infoContainer}>
        {infoArr.map((item, index) => (
          <NavItem item={item} />
        ))}
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 50,
          left: 16,
          right: 16,
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
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
