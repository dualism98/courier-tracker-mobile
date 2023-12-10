import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import MapView, {Region} from 'react-native-maps';
import RNLocation, {Subscription} from 'react-native-location';

import {colors} from '../theme/colors';
import socket from '../services/socket/socket';
import storage from '../services/storage/storage';
import StorageKeys from '../services/storage/StorageKeys';

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
        const userId = storage.getString(StorageKeys.USER_ID);
        socket.auth = {userId};
        socket.connect();
        const initialLocation = await RNLocation.getLatestLocation();
        socket.emit('location', initialLocation);
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
            socket.emit('location', location);
          },
        );
      }
    };

    requestLocationPermission();

    return () => {
      if (locationSubscription) {
        locationSubscription();
      }
    };
  }, []);

  if (!initialRegion) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

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

  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
