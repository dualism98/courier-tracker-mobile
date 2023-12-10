import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NavigationKeys from './NavigationKeys';
import SignUpScreen from '../screens/SignUpScreen';
import MapScreen from '../screens/MapScreen';
import storage from '../services/storage/storage';
import StorageKeys from '../services/storage/StorageKeys';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  const profileIsCreated = storage.getBoolean(StorageKeys.PROFILE_CREATED);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        profileIsCreated
          ? NavigationKeys.MapScreen
          : NavigationKeys.SignUpScreen
      }>
      <Stack.Screen
        name={NavigationKeys.SignUpScreen}
        component={SignUpScreen}
      />
      <Stack.Screen name={NavigationKeys.MapScreen} component={MapScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
