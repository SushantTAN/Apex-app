import { WIDTH } from "@apexapp/utils/constants";
import React, { useEffect, useState } from "react";
import { View, Text, Image, useWindowDimensions, ScrollView, TouchableOpacity } from "react-native";
import RenderHTML from "react-native-render-html";

const ShowHints = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      {!open && <TouchableOpacity onPress={() => { setOpen(true) }}>
        <Text>SHOW HINTS</Text>
      </TouchableOpacity>}

      {
        open && <TouchableOpacity onPress={() => { setOpen(false) }}>
          <RenderHTML
            contentWidth={WIDTH}
            baseStyle={{ fontFamily: 'OpenSans-Regular', }}
            source={{ html: props.data ? props.data : 'No hints for this question' }}
          />
          {/* <Text>
          {props.data ? props.data : 'No hints for this question'}
        </Text> */}
        </TouchableOpacity>
      }
    </View>
  );
}

export default ShowHints