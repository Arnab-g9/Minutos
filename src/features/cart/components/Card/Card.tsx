import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../../../theme/ThemeProvider';
import { useStyles } from './Card.styles';
import { ImageSource } from '../../../../constants/assets/Images';
import { default as Text } from '../../../../components/Text/MSText';

const Card = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.productDetailsContainer}>
        <View style={styles.productDetails}>
          <Image source={ImageSource.item1} />
          <View>
            <Text>Tata Salt</Text>
            <Text fontSize={16} varient="semiBold">
              ₹24{' '}
              <Text fontSize={12} varient="regular" style={styles.actualPrice}>
                ₹25
              </Text>
            </Text>
          </View>
        </View>
        <Image source={ImageSource.cross} />
      </View>
      <View style={styles.dropDownAndCounterContainer}>
        <TouchableOpacity style={styles.dropDown}>
          <Text>500 g</Text>
          <Image source={ImageSource.downArrow}/>
        </TouchableOpacity>

        <View style={styles.counter}>
            <TouchableOpacity style={[styles.btn, styles.leftRadius]} onPress={()=>setCount(count>0 ? count-1:0 )} activeOpacity={0.8}>
                <Image source={ImageSource.minusWhite}/>
            </TouchableOpacity>
            <View style={styles.countValueContainer}>
                <Text>{count}</Text>
            </View>
            <TouchableOpacity style={[styles.btn, styles.rightRadius]} onPress={()=>setCount(count<10 ? count+1:count )} activeOpacity={0.8}>
                <Image source={ImageSource.plusWhite}/>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
