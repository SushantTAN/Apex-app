import Walkthrough from '@modules/walkthrough/walkthrough';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
  RefreshControl
} from 'react-native';

import { useSelector } from 'react-redux';

import colors from '@utils/colors';
import { HEIGHT, WIDTH } from '@utils/constants';
import SuccessIcon from '@assets/images/Success.svg';

const SuccessPopup = (props) => {

  const successMsg = useSelector(state => state.popupReducer.successMsg);


  return (
    <>
      {successMsg !== '' && <View style={{
        position: 'absolute',
        top: 0,
        zIndex: 9,
        width: WIDTH - 32,
        backgroundColor: colors.success_bg,
        opacity: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        margin: 16,
        borderRadius: 4,
        flexDirection: 'row',
      }}>
        <SuccessIcon style={{ color: "#fff" }} />
        <Text style={{ color: 'black', paddingHorizontal: 8 }}>{successMsg}</Text>

      </View>}

    </>);
}

export default SuccessPopup;