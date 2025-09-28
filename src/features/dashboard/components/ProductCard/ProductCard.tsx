// import { Image, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { useTheme } from '../../../../theme/ThemeProvider'
// import { useStyles } from './ProductCard.styles';
// import { default as Text } from '../../../../components/Text/MSText'
// import { useNavigation } from '@react-navigation/native';
// import { ScreenNames } from '../../../../navigation/stack/constants';
// import PlusIcon from 'react-native-vector-icons/Feather'
// import { IItem } from '../../Types/GetSubCategorieItems.Types';

// interface props {
//     product: IItem
// }
// const ProductCard = ({ product }: props) => {
//     const { colors } = useTheme();
//     const styles = useStyles(colors);
//     const navigation = useNavigation();
//     console.log("thsi is product ===>", product);
//     const handlePressCard = () => {
//         navigation.navigate(ScreenNames.PRODUCT_DETAILS as never);
//     }
//     const onPressAddIcon = () => {
//         navigation.navigate(ScreenNames.CART_SCREEN as never);
//     }
//     return (
//         <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={handlePressCard}>
//             {
//                 product.discount ? <View style={{ alignSelf: 'flex-start', backgroundColor: colors.primary, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 }}>
//                     <Text varient='semiBold' fontSize={14} style={styles.offerText}>{product.discount} % OFF</Text>
//                 </View> : <View style={{ alignSelf: 'flex-start', backgroundColor: 'transparent', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 }}>
//                     <Text varient='semiBold' fontSize={14} style={styles.offerText} >{''}</Text>
//                 </View>
//             }
//             <View style={styles.imgContainer}>
//                 <Image source={{ uri: product?.images?.[0] || product?.images?.[1] }} style={{ width: '80%', height: '80%', resizeMode: 'contain' }} />
//             </View>
//             {/* {
//                 product.discount && <View style={styles.offerContainer}>
//                     <Image source={ImageSource.offer} />
//                     <View style={styles.offerTextContainer}>
//                         <Text varient='medium' fontSize={12} style={styles.offerText}>{product.discount}% off</Text>
//                     </View>
//                 </View>
//             } */}
//             <Text varient='semiBold' style={styles.prodName}>
//                 {product.name}
//             </Text>
//             <Text varient='regular' style={styles.prodWeight}>{product.unit}</Text>
//             <View style={styles.priceAndAddBtnContainer}>
//                 <View>
//                     <Text style={styles.crossPrice}>{product.amountSaving ? `₹${product.originalPrice}` : null}</Text>
//                     <Text style={styles.price} varient='semiBold'>{product.amountSaving ? `₹${product.discountedMRP}` : `₹${product.price}`}</Text>
//                 </View>
//                 <TouchableOpacity style={styles.addBtn} onPress={onPressAddIcon}>
//                     {/* <Image source={ImageSource.plusActive} style={styles.addIcon} /> */}
//                     <PlusIcon name={'plus'} size={20} color={colors.primary} />
//                     {/* <Text varient='medium' fontSize={12} style={styles.addBtnTxt}>ADD</Text> */}
//                 </TouchableOpacity>
//             </View>
//         </TouchableOpacity>
//     )
// }

// export default ProductCard


import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../../../theme/ThemeProvider'
import { useStyles } from './ProductCard.styles';
import { default as Text } from '../../../../components/Text/MSText'
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../../navigation/stack/constants';
import PlusIcon from 'react-native-vector-icons/Feather'
import { IItem } from '../../Types/GetSubCategorieItems.Types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { addToCart, ICartItem } from '../../../cart/slice/CartSlice';
import { Toast } from 'toastify-react-native';
import { ImageSource } from '../../../../constants/assets/Images';

interface props {
    product: IItem
}

const ProductCard = ({ product }: props) => {
    const { cart } = useSelector((store: RootState) => store.cart)
    const { colors } = useTheme();
    const styles = useStyles(colors);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onPressAddIcon = () => {
        const existingItem = cart.find(item => item._id === product._id);

        const cartItem: ICartItem = {
            ...product,
            quantity: existingItem ? 1 : 1 // always increment by 1 if exists
        }

        dispatch(addToCart(cartItem));

        Toast.show({
            type: 'success',
            text1: 'Cart Updated',
            text2: existingItem
                ? `${product.name} quantity updated`
                : `${product.name} added to cart`,
            position: 'bottom',
            visibilityTime: 3000,
            autoHide: true,
        });
    };




    const handlePressCard = () => {
        navigation.navigate(ScreenNames.PRODUCT_DETAILS as never, {
            product: product,
        });
    }

    // const onPressAddIcon = () => {
    //     navigation.navigate(ScreenNames.CART_SCREEN as never);
    // }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handlePressCard}>
            {
                product.discount ? (
                    <View style={styles.discountBadge}>
                        <Text varient='semiBold' fontSize={14} style={styles.offerText}>
                            {product.discount} % OFF
                        </Text>
                    </View>
                ) : (
                    <View style={styles.emptyBadge}>
                        <Text varient='semiBold' fontSize={14} style={styles.offerText}></Text>
                    </View>
                )
            }

            <View style={styles.imgContainer}>
                {
                    product?.images?.[0] || product?.images?.[1] ? <Image
                        source={{ uri: product?.images?.[0] || product?.images?.[1] }}
                        style={styles.productImage}
                    /> : <Image
                        source={ImageSource.item1}
                        style={styles.productImage}
                    />
                }
            </View>

            <Text varient='semiBold' style={styles.prodName}>
                {product.productName}
            </Text>
            <Text varient='regular' style={styles.prodWeight}>
                {product.unit}
            </Text>

            <View style={styles.priceAndAddBtnContainer}>
                <View>
                    <Text style={styles.crossPrice}>
                        {product.amountSaving ? `₹${product.originalPrice}` : null}
                    </Text>
                    <Text style={styles.price} varient='semiBold'>
                        {product.amountSaving ? `₹${product.discountedMRP}` : `₹${product.price}`}
                    </Text>
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={onPressAddIcon} activeOpacity={0.8}>
                    <PlusIcon name={'plus'} size={20} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard
