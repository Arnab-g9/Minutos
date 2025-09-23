import { Dimensions, Image, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../../../theme/ThemeProvider'
import { useStyles } from './DashboardScreen.styles'
import Carousal from '../../../../components/Carousel/Carousal'
import { default as Text } from '../../../../components/Text/MSText'
import { ImageSource } from '../../../../constants/assets/Images'
import ProductCard from '../../components/ProductCard/ProductCard'
import { productData } from '../../mock/ProductMockData'
import { CategoryMockData } from '../../mock/CategoryMockData'
import { getResizeImageHeight } from '../../../../utils/getResizeImageHeight'
import RightArrow from 'react-native-vector-icons/Entypo'

const data = [
    { id: 1, image: ImageSource.carousel1 },
    { id: 2, image: ImageSource.carousel2 },
    { id: 3, image: ImageSource.carousel3 },
    { id: 4, image: ImageSource.carousel4 },
    { id: 5, image: ImageSource.carousel5 },
];

const { width: screenWidth } = Dimensions.get("window");
const DashboardScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const styles = useStyles(colors);
    const carouselHeight = screenWidth / 2;

    console.log(getResizeImageHeight(ImageSource.banner, 32), "<---")
    useEffect(() => {
        const renderHeader = () => <DashboardHeader address='HOME - Sultan Bhag, Erraga...' />;
        navigation.setOptions({
            headerShown: true,
            header: renderHeader,
        });
    }, [navigation]);
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Not required right now */}
            {/* <Label label='Zappping Delivery in 14 mins' /> */}

            <View style={[styles.bannerConatiner, { height: getResizeImageHeight(ImageSource.banner1, 32) }]}>
                <Image source={ImageSource.banner1} style={styles.banner} />
            </View>


            <Carousal data={data} showPagination={true} loop={true} mode={'parallax'} renderItem={
                ({ item }) => (
                    <View style={[styles.card, { width: screenWidth, height: carouselHeight }]}>
                        <Image source={item.image} style={styles.image} resizeMode="cover" />
                    </View>
                )
            } autoPlay autoPlayInterval={2000} showDots={false} />



            {/* label and button container */}
            <View style={[styles.lblBtnContainer, styles.marginTop]}>
                <Text varient='semiBold' fontSize={18}>
                    Your Go to Items
                </Text>
                <TouchableOpacity style={styles.btn}>
                    <Text varient='medium' fontSize={18} style={styles.btnTxt}>
                        See All
                    </Text>
                    {/* <Image source={ImageSource.right} style={styles.rightArrow} /> */}
                    <RightArrow name={'chevron-right'} size={20} color={colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Here show 4 items in each row */}
            <View style={styles.gridContainer}>
                {
                    CategoryMockData.map((category, index) => <View style={styles.gridItem} key={index.toString()}>
                        <View style={styles.gridImageBox}>
                            <Image source={category.image} />

                        </View>
                        <Text style={{ textAlign: 'center', color: colors.primaryLight }} varient='medium' fontSize={12}>{category.name}</Text>
                    </View>)
                }
            </View>

            <View style={[styles.bannerConatiner, { height: getResizeImageHeight(ImageSource.banner2, 32) }]}>
                <Image source={ImageSource.banner2} style={[styles.banner, styles.banner2]} />
            </View>

            {/* label and button container */}
            <View style={[styles.lblBtnContainer, styles.marginTop]}>
                <Text varient='semiBold' fontSize={18}>
                    Your Go to Items
                </Text>
                <TouchableOpacity style={styles.btn}>
                    <Text varient='medium' fontSize={18} style={styles.btnTxt}>
                        See All
                    </Text>
                    {/* <Image source={ImageSource.right} style={styles.rightArrow} /> */}
                    <RightArrow name={'chevron-right'} size={20} color={colors.primary} />
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

            <View style={[styles.bannerConatiner, { height: getResizeImageHeight(ImageSource.banner2, 32) }]}>
                <Image source={ImageSource.banner2} style={[styles.banner, styles.banner2]} />
            </View>

            {/* label and button container */}
            <View style={[styles.lblBtnContainer, styles.marginTop]}>
                <Text varient='semiBold' fontSize={18}>
                    Your Go to Items
                </Text>
                <TouchableOpacity style={styles.btn}>
                    <Text varient='medium' fontSize={18} style={styles.btnTxt}>
                        See All
                    </Text>
                    {/* <Image source={ImageSource.right} style={styles.rightArrow} /> */}
                    <RightArrow name={'chevron-right'} size={20} color={colors.primary} />
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
        </ScrollView>
    )
}

export default DashboardScreen
