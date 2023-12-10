import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import RNLocation, {Subscription} from 'react-native-location';

import {colors} from '../theme/colors';
import socket from '../services/socket/socket';

const MapScreen: React.FC = () => {
  const [initialRegion, setInitialRegion] = React.useState<Region | null>();

  React.useEffect(() => {
    let locationSubscription: Subscription | null = null;
    const requestLocationPermission = async () => {
      const granted = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      });

      if (granted) {
        const initialLocation = await RNLocation.getLatestLocation();
        if (initialLocation) {
          setInitialRegion({
            latitude: initialLocation?.latitude,
            longitude: initialLocation?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
        locationSubscription = RNLocation.subscribeToLocationUpdates(
          locations => {
            const location = locations[0];
          },
        );
      }
    };

    socket.auth = {userId: 'some'};
    socket.connect();

    requestLocationPermission();

    return () => {
      if (locationSubscription) {
        locationSubscription();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        region={initialRegion}
        style={styles.container}
        showsUserLocation={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tints.white[100],
  },
});

export default MapScreen;
