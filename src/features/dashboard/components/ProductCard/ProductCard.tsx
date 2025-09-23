import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../../../theme/ThemeProvider'
import { useStyles } from './ProductCard.styles';
import { default as Text } from '../../../../components/Text/MSText'
import { ImageSource } from '../../../../constants/assets/Images';
import { IProductitem } from '../../mock/ProductMockData';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../../navigation/stack/constants';
import PlusIcon from 'react-native-vector-icons/Feather'

interface props {
    product: IProductitem
}
const ProductCard = ({ product }: props) => {
    const { colors } = useTheme();
    const styles = useStyles(colors);
    const navigation = useNavigation();
    console.log("thsi is product ===>", product);
    const handlePressCard = () => {
        navigation.navigate(ScreenNames.PRODUCT_DETAILS as never);
    }
    const onPressAddIcon = () => {
        navigation.navigate(ScreenNames.CART_SCREEN as never);
    }
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={handlePressCard}>
            {
                product.discount ? <View style={{ alignSelf: 'flex-start', backgroundColor: colors.primary, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 }}>
                    <Text varient='semiBold' fontSize={14} style={styles.offerText}>{product.discount} % OFF</Text>
                </View> : <View style={{ alignSelf: 'flex-start', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 }}>
                    <Text varient='semiBold' fontSize={14} style={styles.offerText} >{''}</Text>
                </View>
            }
            <View style={styles.imgContainer}>
                <Image source={product.image} />
            </View>
            {/* {
                product.discount && <View style={styles.offerContainer}>
                    <Image source={ImageSource.offer} />
                    <View style={styles.offerTextContainer}>
                        <Text varient='medium' fontSize={12} style={styles.offerText}>{product.discount}% off</Text>
                    </View>
                </View>
            } */}
            <Text varient='semiBold' style={styles.prodName}>
                {product.name}
            </Text>
            <Text varient='regular' style={styles.prodWeight}>{product.weight}</Text>
            <View style={styles.priceAndAddBtnContainer}>
                <View>
                    <Text style={styles.crossPrice}>{product.discount ? `₹${product.price}` : null}</Text>
                    <Text style={styles.price} varient='semiBold'>{product.discount ? `₹${product.discountPrice}` : `₹${product.price}`}</Text>
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={onPressAddIcon}>
                    {/* <Image source={ImageSource.plusActive} style={styles.addIcon} /> */}
                    <PlusIcon name={'plus'} size={20} color={colors.primary} />
                    <Text varient='medium' fontSize={12} style={styles.addBtnTxt}>ADD</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard

