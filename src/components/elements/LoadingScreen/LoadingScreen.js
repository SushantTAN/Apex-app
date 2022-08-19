import Walkthrough from '@modules/walkthrough/walkthrough';
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  RefreshControl
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { HEIGHT, WIDTH } from '@utils/constants';

const LoadingScreen = (props) => {

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loadingReducer.isLoading);


  return <>{isLoading && <View style={{
    position: 'absolute',
    zIndex: 10,
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: '#D6D6D6',
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  }}>

    <ActivityIndicator

      visible={true}
      overlayColor='rgba(0, 0, 0, 0.2)'
      textStyle={{ color: '#000' }}
      color="#673ab7"
      animation='slide'
      size="large"
      dotRadius={12}
      animating={true}
    />
  </View>}
  </>
}

export default LoadingScreen;