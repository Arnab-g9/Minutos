import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './ProductDetailsScreen.styles';
import PrimaryHeader from '../../../../components/Header/PrimaryHeader/PrimaryHeader';
import Carousal from '../../../../components/Carousel/Carousal';
import { ImageSource } from '../../../../constants/assets/Images';
import { default as Text } from '../../../../components/Text/MSText'
import ProductWeightCard from '../../components/ProductWeightCard/ProductWeightCard';
const { width: screenWidth } = Dimensions.get("window");

const data = [
    { id: 1, image: ImageSource.bannerProduct1 },
    { id: 2, image: ImageSource.bannerProduct1 },
    { id: 3, image: ImageSource.bannerProduct1 },
];

export interface IProductWeightData {
    weight: string,
    price: number,
    per100: number
}

const productWeightData: IProductWeightData[] = [
    {
        weight: '500 gms',
        price: 24,
        per100: 4.4,
    },
    {
        weight: '1 kg',
        price: 40,
        per100: 4.4,
    }, {
        weight: '1.5 kg',
        price: 54,
        per100: 3.6,
    },
]

const ProductdetailsScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const carouselHeight = screenWidth / 2;
    const styles = useStyles(colors);
    useEffect(() => {
        const renderHeader = () => <PrimaryHeader address='HOME - Sultan Bhag, Erraga...' />;
        navigation.setOptions({
            headerShown: true,
            header: renderHeader,
        });
    }, [navigation]);
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.carousalContainer}>
                <Carousal data={data} showPagination={true} loop={true} renderItem={
                    ({ item }) => (
                        <View style={[styles.card, { width: screenWidth, height: carouselHeight }]}>
                            <Image source={item.image} style={styles.image} resizeMode="cover" />
                        </View>
                    )
                } showDots />
            </View>
            <Text varient='semiBold' fontSize={20}>
                Tata Salt
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
            >
                {
                    productWeightData.map((product, index) => <ProductWeightCard product={product} key={index.toString()} />)
                }
            </ScrollView>
        </ScrollView>
    )
}

export default ProductdetailsScreen
