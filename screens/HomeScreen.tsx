import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
//import Voice from '@react-native-voice/voice';
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

  const _onSpeechStart = () => {
    console.log('onSpeechStart');
    setText('');
  };
  const _onSpeechEnd = () => {
    console.log('onSpeechEnd');
  };

  const _onSpeechResults = (event: any) => {
    console.log('onSpeechResults');
    setText(event.value[0]);

    let result = event.value[0].toLowerCase();
    if (result.includes('text') && result.includes('vocal')) {
      props.navigation.navigate('TTS');
    } else if (result.includes('detection') && result.includes('objet')) {
      props.navigation.navigate('ObjectDetection');
    } else if (result.includes('trajectoire')) {
      props.navigation.navigate('Path');
    } else if (result.includes('note') && result.includes('vocal')) {
      props.navigation.navigate('VoiceNote');
    } else {
      openMic();
    }
  };

  const _onSpeechError = (event: any) => {
    console.log('_onSpeechError');
    console.log(event.error);
    openMic();
  };

  useEffect(() => {
    // Voice.onSpeechStart = _onSpeechStart;
    // Voice.onSpeechEnd = _onSpeechEnd;
    // Voice.onSpeechResults = _onSpeechResults;
    // Voice.onSpeechError = _onSpeechError;
    // return () => {
    //   Voice.destroy().then(Voice.removeAllListeners);
    // };
  }, []);

  const openMic = () => {
    // if (isValid) {
    //   setTimeout(() => {
    //     Voice.start('fr-FR');
    //     setIsRecord(true);
    //   }, 1000);
    //   setTimeout(() => {
    //     Voice.stop();
    //     setIsRecord(false);
    //   }, 10000);
    // }
  };
  useEffect(() => {
    //  openMic();
    Tts.setDefaultLanguage('fr-FR');
    Tts.speak('Bienvenue smart eyes est là pour vous assister');
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
      <Text>
        {text} ... {buttonLabel} .... {voiceLabel}
      </Text>
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
