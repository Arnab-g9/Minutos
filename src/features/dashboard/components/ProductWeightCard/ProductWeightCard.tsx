import { StyleSheet, View } from 'react-native'
import React from 'react'
import { IProductWeightData } from '../../screens/ProductDetails/ProductdetailsScreen'
import { default as Text } from '../../../../components/Text/MSText'
import { useTheme } from '../../../../theme/ThemeProvider'
import { useStyles } from './ProductWeightCard.styles'

interface props {
    product: IProductWeightData
}

const ProductWeightCard = ({ product }: props) => {
    const { colors } = useTheme();
    const styles = useStyles(colors);
    return (
        <View style={styles.container}>
            <Text varient='regular' style={{ lineHeight: 14 }}>{product.weight}</Text>
            <Text fontSize={16} varient='medium'>₹{product.price}</Text>
            <Text style={{ color: colors.primary }}>₹{product.per100} / 100 gms</Text>
        </View>
    )
}

export default ProductWeightCard

const styles = StyleSheet.create({})