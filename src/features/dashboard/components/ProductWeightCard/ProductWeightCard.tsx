import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { IProductWeightData } from '../../screens/ProductDetails/ProductdetailsScreen';
import { default as Text } from '../../../../components/Text/MSText';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './ProductWeightCard.styles';
import { ImageSource } from '../../../../constants/assets/Images';

interface props {
  product: IProductWeightData;
}

const ProductWeightCard = ({ product }: props) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  return (
    <View style={styles.container}>
      {product.discount ? (
        <View
          style={{
            alignSelf: 'flex-end',
            backgroundColor: colors.primary,
            paddingHorizontal: 5,
            paddingVertical: 0,
            borderRadius: 5,
          }}
        >
          <Text varient="semiBold" fontSize={14} style={styles.offerText}>
            {product.discount} % OFF
          </Text>
        </View>
      ) : (
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: 'transparent',
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 5,
          }}
        >
          <Text varient="semiBold" fontSize={14} style={styles.offerText}>
            {''}
          </Text>
        </View>
      )}
      <Text varient="regular" style={{ lineHeight: 14, color: colors.contentPrimary }}>
        {product.weight}
      </Text>
      <Text fontSize={16} varient="medium" style={styles.price}>
        ₹{product.price}
      </Text>
      <Text style={[styles.per100]} varient="medium">
        ₹{product.per100} / 100 gms
      </Text>
      {/* 
             {
                            product.discount && <View style={styles.offerContainer}>
                                <Image source={ImageSource.offer} />
                                <View style={styles.offerTextContainer}>
                                    <Text varient='medium' fontSize={12} style={styles.offerText}>{product.discount}% off</Text>
                                </View>
                            </View>
                        } */}
    </View>
  );
};

export default ProductWeightCard;

const styles = StyleSheet.create({});
