import React from "react";

import { View } from "react-native";
import WalkthroughTemplate from "../components/templates/walkthrough";

const Walkthrough = (props) => {
  return (
    <View>
      <WalkthroughTemplate {...props} />
    </View>
  );
}

export default Walkthrough;