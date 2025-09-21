import { Dimensions, Image, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader'
import { useNavigation } from '@react-navigation/native'
import Label from '../../components/Label/Label'
import { useTheme } from '../../../../theme/ThemeProvider'
import { useStyles } from './DashboardScreen.styles'
import Carousal from '../../../../components/Carousel/Carousal'
import { default as Text } from '../../../../components/Text/MSText'
import { ImageSource } from '../../../../constants/assets/Images'
import ProductCard from '../../components/ProductCard/ProductCard'
import { productData } from '../../mock/ProductMockData'
import { CategoryMockData } from '../../mock/CategoryMockData'

const data = [
    { id: 1, image: ImageSource.banner },
    { id: 2, image: ImageSource.banner },
    { id: 3, image: ImageSource.banner },
];

const { width: screenWidth } = Dimensions.get("window");
const DashboardScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const styles = useStyles(colors);
    const carouselHeight = screenWidth / 2;
    useEffect(() => {
        const renderHeader = () => <DashboardHeader address='HOME - Sultan Bhag, Erraga...' />;
        navigation.setOptions({
            headerShown: true,
            header: renderHeader,
        });
    }, [navigation]);
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Label label='Zappping Delivery in 14 mins' />
            <Carousal data={data} showPagination={true} loop={true} mode={'parallax'} renderItem={
                ({ item }) => (
                    <View style={[styles.card, { width: screenWidth, height: carouselHeight }]}>
                        <Image source={item.image} style={styles.image} resizeMode="cover" />
                    </View>
                )
            } />
            {/* label and button container */}
            <View style={styles.lblBtnContainer}>
                <Text varient='semiBold' fontSize={18}>
                    Your Go to Items
                </Text>
                <TouchableOpacity style={styles.btn}>
                    <Text varient='medium' fontSize={18} style={styles.btnTxt}>
                        See All
                    </Text>
                    <Image source={ImageSource.right} style={styles.rightArrow} />
                </TouchableOpacity>
            </View>
            {/* Product container */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                style={styles.productContainer}
            >
                {
                    productData.map((product, index) => <ProductCard product={product} key={index.toString()} />)
                }
            </ScrollView>
            {/* label and button container */}
            <View style={[styles.lblBtnContainer, styles.marginTop]}>
                <Text varient='semiBold' fontSize={18}>
                    Your Go to Items
                </Text>
                <TouchableOpacity style={styles.btn}>
                    <Text varient='medium' fontSize={18} style={styles.btnTxt}>
                        See All
                    </Text>
                    <Image source={ImageSource.right} style={styles.rightArrow} />
                </TouchableOpacity>
            </View>

            {/* Here show 4 items in each row */}
            <View style={styles.gridContainer}>
                {
                    CategoryMockData.map((category, index) => <View style={styles.gridItem}>
                        <View style={styles.gridImageBox}>
                            <Image source={category.image} />

                        </View>
                        <Text style={{ textAlign: 'center', color: colors.primaryLight }} varient='medium' fontSize={12}>{category.name}</Text>
                    </View>)
                }
            </View>
        </ScrollView>
    )
}

export default DashboardScreen
