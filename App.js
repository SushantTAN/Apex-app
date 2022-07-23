import 'react-native-gesture-handler';

import React from 'react';
import { Text, TouchableOpacity, View, LogBox } from 'react-native';

import Router from './src/navigation/AppNavigation';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...', 'ViewPropTypes', 'Warning: Failed prop type']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Router />
  );
}

export default App;
