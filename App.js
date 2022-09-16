import 'react-native-gesture-handler';

import React from 'react';
import { Text, TouchableOpacity, View, LogBox } from 'react-native';

import Router from './src/navigation/AppNavigation';
import ZoomMeeting from '@apexapp/components/modules/Pages/zoomMeeting';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...', 'ViewPropTypes will', 'Warning: Failed prop type', 'Require cycle:']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Router />
    // <ZoomMeeting />
  );
}

export default App;
