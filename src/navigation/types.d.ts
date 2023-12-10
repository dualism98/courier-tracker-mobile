import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import NavigationKeys from './NavigationKeys';

export type RootStackParamsList = {
  SignUpScreen: undefined;
  MapScreen: undefined;
};

export type SignUpNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  NavigationKeys.SignUpScreen
>;
