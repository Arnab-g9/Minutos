import { Image, StatusBar, View } from 'react-native'
import React, { Children } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './DashboardHeader.styles';
import { ImageSource } from '../../../../constants/assets/Images';
import { default as Text } from '../../../../components/Text/MSText'
import Searchbar from '../../../../components/Searchbar/MSSearchbar';
import SearchIcon from 'react-native-vector-icons/Feather';
import LocationIcon from 'react-native-vector-icons/Ionicons'
import DownArrowIcon from 'react-native-vector-icons/Entypo'
import UserIcon from 'react-native-vector-icons/Feather'


interface props {
    address: string,
}

const DashboardHeader = ({ address }: props) => {
    const { colors } = useTheme();
    const styles = useStyles(colors);
    // const navigation = useNavigation();
    const renderLeftIcon = () => {
        return <SearchIcon name={'search'} size={20} />
    }
    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <View style={styles.section1}>
                <View style={[styles.section1, styles.flex1]}>
                    {/* <Image source={ImageSource.location} style={styles.location} /> */}
                    <LocationIcon name={"location-outline"} size={20} color={colors.primaryCtaText} />
                    <Text varient='medium' fontSize={16} style={styles.addressTxt}>{address}</Text>
                    {/* <Image source={ImageSource.downArrow} style={styles.downArrow} /> */}
                    <DownArrowIcon name={'chevron-small-down'} size={20} color={colors.primaryCtaText} />
                </View>
                {/* <Image source={ImageSource.profile} style={styles.profile} /> */}
                <UserIcon name={'user'} size={20} color={colors.primaryCtaText} />

            </View>
            <Searchbar placeholder='Search' renderLeftIcon={renderLeftIcon} />
        </SafeAreaView>
    )
}

export default DashboardHeader

