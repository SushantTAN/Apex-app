import React, { useEffect, useState } from "react";
import { View, Text, Image, useWindowDimensions, ScrollView, TouchableOpacity } from "react-native";

const ShowHints = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      {!open && <TouchableOpacity onPress={() => { setOpen(true) }}>
        <Text>SHOW HINTS</Text>
      </TouchableOpacity>}

      {
        open && <TouchableOpacity onPress={() => { setOpen(false) }}><Text>
          {props.data ? props.data : 'No hints for this question'}
        </Text>
        </TouchableOpacity>
      }
    </View>
  );
}

export default ShowHints