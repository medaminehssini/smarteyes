import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import Tts from 'react-native-tts';

export const HomeScreen = (props: any) => {
  const [isRecord, setIsRecord] = useState(false);
  const [choice, setChoice] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [text, setText] = useState<string>('');
  const buttonLabel = isRecord ? 'Stop' : 'Start';
  const voiceLabel = text
    ? text
    : isRecord
    ? 'Say something...'
    : 'press Start button';

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.speak('Welcome to smart eyes');
    setTimeout(() => {
      getMenu();
    }, 2000);
  }, []);

  const getMenu = () => {
    props.navigation.navigate('Menu');
    // Tts.stop();
    // setIsValid(false);
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <TouchableOpacity onPress={getMenu} style={styles.image}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('./assets/images/splash.png')}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
