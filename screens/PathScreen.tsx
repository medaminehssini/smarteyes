import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export const PathScreen = () => {
  return (
    <View>
      <MapView
        style={{width: '100%', height: '100%'}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <MapViewDirections
          origin={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          destination={{
            latitude: 37.78825,
            longitude: -121.4324,
          }}
          apikey={'AIzaSyDwdj1Nim_GuT_EJQKRrWrwLZHXFT9d2f8'}
          strokeWidth={3}
          strokeColor={'red'}></MapViewDirections>
      </MapView>
    </View>
  );
};
