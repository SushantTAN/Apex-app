import React from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";
import Animated, { FadeIn } from 'react-native-reanimated';

const Walkthrough = (props) => {
  return (
    <View style={styles.container}>

      <Animated.View entering={FadeIn.delay(500).duration(700)}>
        <Image
          // style={styles.tinyLogo}
          source={require('../../../assets/images/apexLogo.png')}
        />
      </Animated.View>
    </View>
  );
}

export default Walkthrough;