/**
 * This is a carousel Component

 * @param {Function} props.buttonClick - function to execute on pressing explore all button.
 * @param {Component} props.cardItem - component to render as card.
 * @param {Array} props.data - data list to render.
 * 

 * @returns {CustomCarousel}- returns a carousel Component with dynamic cards.
 */

import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import styles from '@styles/elements/CustomCarousel.scss';
import { WIDTH } from '@utils/constants';
import CustomButton from '../CustomButton';



const CustomCarousel = props => {
  const [activeSlide, setActiveSlide] = useState(0);

  const CarouselRef = useRef(null);

  return (
    <View>
      <Carousel
        ref={CarouselRef}
        data={props.data}
        renderItem={props.cardItem}
        sliderWidth={WIDTH}
        itemWidth={WIDTH}
        onSnapToItem={index => setActiveSlide(index)}
      />

      <View style={styles.paginationContainers}>
        <Pagination
          dotsLength={props.data.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.pagiStyle}
          dotColor={'#2E3192'}
          dotStyle={[
            styles.pagiDot,
            { width: WIDTH / props.data.length - 20 },
          ]}
          inactiveDotColor={'#EAEAEA'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={1}
          inactiveDotStyle={[
            styles.inactDotStyle,
            { width: WIDTH / props.data.length - 20 },
          ]}
          carouselRef={CarouselRef}
          tappableDots={!!CarouselRef}
        />
      </View>
      <CustomButton
        type="white"
        onPress={props.buttonClick}
        title={'Explore all'}
        style={styles.button}
        color="#000000"
      />
    </View>
  );
};

export default CustomCarousel;
