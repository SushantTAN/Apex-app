import React from "react";
import { View } from "react-native";
import Walkthrough from "../modules/walkthrough/walkthrough";

const WalkthroughTemplate = (props) => {
  return (
    <View>
      <Walkthrough {...props} />
    </View>
  );
}

export default WalkthroughTemplate;