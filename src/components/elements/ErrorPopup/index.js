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

import CloseIcon from '@assets/images/CloseCircle.svg';
import colors from '@utils/colors';
import { HEIGHT, WIDTH } from '@utils/constants';
import SuccessIcon from '@assets/images/Success.svg';

const ErrorPopup = (props) => {

  const errorMsg = useSelector(state => state.popupReducer.errorMsg);


  return (
    <>
      {errorMsg !== '' && <View style={{
        position: 'absolute',
        top: 0,
        zIndex: 9,
        width: WIDTH - 32,
        backgroundColor: 'white',
        opacity: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        margin: 16,
        borderRadius: 4,
        flexDirection: 'row',
      }}>
        <CloseIcon style={{ color: "#fff" }} />
        <Text style={{ color: 'red', paddingHorizontal: 8 }}>{errorMsg}</Text>

      </View>}

    </>);
}

export default ErrorPopup;