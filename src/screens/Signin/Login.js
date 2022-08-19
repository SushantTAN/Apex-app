import React from 'react';
import { View } from 'react-native';

import LoginTemplate from '@templates/Login';

const Login = props => {
  return (
    <View>
      <LoginTemplate {...props} />
    </View>
  );
};

export default Login;
