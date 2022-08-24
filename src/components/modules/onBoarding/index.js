/**
 * This is an onboarding page with 3 slides. This page is shown only when user opens the app for the first time.
 * @param {Object} props.navigation - contains all the propeties of react navigation.
 * @returns {OnBoarding}- returns a module for on boarding.
 */

import React, { useRef, useState } from 'react';
import { Text, View, Image, BackHandler, Alert } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import styles from '@styles/modules/onBoarding.scss';
import CustomButton from '@elements/CustomButton';
import { HEIGHT, WIDTH } from '@utils/constants';
import { errorAlert } from '@utils/functions';
import { useFocusEffect } from '@react-navigation/native';

const data = [
  {
    title: 'Apex Educational Academy',
    image: require("@assets/images/Frame72.png")

  },
  {
    title: 'One Platform For Everything',
    image: require("@assets/images/Frame37.png")
  },
  {
    title: 'Where student meets excellence',
    image: require("@assets/images/Frame36.png")
  },
];



const OnBoarding = props => {
  const [activeSlide, setActiveSlide] = useState(0);

  const CarouselRef = useRef(null);

  const _renderItemWithParallax = ({ item, index }, parallaxProps) => {
    return <View style={styles.textandimage}>
      <Image
        style={{ height: HEIGHT, width: WIDTH }}
        source={item.image} />
      {/* <View
        style={{ height: 200, width: WIDTH, backgroundColor: "green", position: "absolute", bottom: 0, zIndex: 0 }}><Text>jfjyf</Text></View> */}


      <View style={styles.paginationContainer}>
        <Text style={styles.heading}>{item.title}</Text>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.pagination}
            dotColor={'rgba(255, 255, 255, 0.92)'}
            dotStyle={styles.paginationDot}
            inactiveDotColor={'white'}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
            inactiveDotStyle={styles.inactiveDotStyle}
            carouselRef={CarouselRef}
            tappableDots={!!CarouselRef}
          />

          <CustomButton
            type="white"
            title={activeSlide === 2 ? 'Signup' : 'Skip to Signup'}
            onPress={handleSigninPress}
          />
        </View>
      </View>
    </View>


  };

  useFocusEffect(
    React.useCallback(async () => {
      // console.log("use focus effect dahsboard")
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          // errorAlert("Hold on!", "Are you sure you want to go back?", BackHandler.exitApp());
          Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        },
      );

      const unsubscribe = props.navigation.addListener('blur', () => {
        backHandler.remove();
      });
      return unsubscribe;
    }, [props.route]),
  );

  const handleSigninPress = () => {
    props.navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Carousel
          ref={CarouselRef}
          data={data}
          renderItem={_renderItemWithParallax}
          sliderWidth={WIDTH}
          itemWidth={WIDTH}
          onSnapToItem={index => setActiveSlide(index)}
        />


      </View>
    </View>
  );
};

export default OnBoarding;
