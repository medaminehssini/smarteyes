import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TransparentHeader = ({navigation, color}: any) => {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999999,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{position: 'absolute', top: 0, left: 6}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="arrow-back" size={50} color={color ? color : 'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default TransparentHeader;
