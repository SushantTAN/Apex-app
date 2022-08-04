import React, { Fragment } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Search from '@screens/Search/Search'
import { MyStack } from '../AppNavigation';

const SearchRouter = () => {
    return (
        <MyStack.Navigator screenOptions={{ headerShown: false }}>
        <MyStack.Screen name="Search" component={Search} />
      </MyStack.Navigator>
    )
}

export default SearchRouter;