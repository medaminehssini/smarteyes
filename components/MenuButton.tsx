import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';

type PropsMenuButton = {
  color: string;
};
const MenuButton = ({color}: PropsMenuButton) => {
  return (
    <Image
      source={require('../screens/assets/images/btn1.png')}
      style={{height: 185, width: '100%'}}></Image>
  );
};

export default MenuButton;
