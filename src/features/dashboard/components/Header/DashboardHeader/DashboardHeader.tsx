import { Image, StatusBar, TouchableOpacity, View } from 'react-native';
import React, { Children } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from './DashboardHeader.styles';
import { default as Text } from '../../../../../components/Text/MSText';
import Searchbar from '../../../../../components/Searchbar/MSSearchbar';
import SearchIcon from 'react-native-vector-icons/Feather';
import LocationIcon from 'react-native-vector-icons/Ionicons';
import DownArrowIcon from 'react-native-vector-icons/Entypo';
import UserIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '../../../../../theme/ThemeProvider';

interface props {
  address: string;
  onPressProfileIcon?: () => void;
  onPressAddressBtn?: () => void;
}

const DashboardHeader = ({
  address,
  onPressProfileIcon,
  onPressAddressBtn,
}: props) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  // const navigation = useNavigation();
  const renderLeftIcon = () => {
    return (
      <SearchIcon name={'search'} size={20} color={colors.contentTertiary} />
    );
  };
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.section1}>
        <View style={styles.flex1}>
          <TouchableOpacity
            style={[styles.section1]}
            activeOpacity={0.8}
            onPress={onPressAddressBtn}
          >
            {/* <Image source={ImageSource.location} style={styles.location} /> */}
            <LocationIcon
              name={'location-outline'}
              size={20}
              color={colors.primaryCtaText}
            />
            <View style={styles.addressTxtContainer}>
              <Text varient="medium" fontSize={16} style={styles.addressTxt}>
                {address}
              </Text>
            </View>
            <DownArrowIcon
              name={'chevron-small-down'}
              size={20}
              color={colors.primaryCtaText}
            />
          </TouchableOpacity>
        </View>
        {/* <Image source={ImageSource.profile} style={styles.profile} /> */}
        <TouchableOpacity onPress={onPressProfileIcon}>
          <UserIcon name={'user'} size={20} color={colors.primaryCtaText} />
        </TouchableOpacity>
      </View>
      <Searchbar placeholder="Search" renderLeftIcon={renderLeftIcon} />
    </SafeAreaView>
  );
};

export default DashboardHeader;
