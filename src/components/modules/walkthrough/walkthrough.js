import React from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";

const Walkthrough = (props) => {
  return (
    <View style={styles.container}>

      <Image
        // style={styles.tinyLogo}
        source={require('../../../assets/images/apexLogo.png')}
      />
    </View>
  );
}

export default Walkthrough;