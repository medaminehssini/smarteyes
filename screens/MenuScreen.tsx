import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';

type PropsMenuScreen = {
  navigation: any;
};

const MenuScreen = ({navigation}: PropsMenuScreen) => {
  const [choice, setChoice] = useState('');

  const _onSpeechStart = () => {
    console.log('onSpeechStart');
  };
  const _onSpeechEnd = () => {
    console.log('onSpeechEnd');
  };

  const _onSpeechResults = (event: any) => {
    console.log('onSpeechResults');
    console.log('onSpeechResults');

    console.log(event);

    let result = event.value[0].toLowerCase();

    if (result.includes('text') || result.includes('speech')) {
      navigation.navigate('TTS');
    } else if (result.includes('detection') || result.includes('object')) {
      navigation.navigate('ObjectDetection');
    } else if (result.includes('trajectory')) {
      navigation.navigate('Path');
    } else if (result.includes('note') || result.includes('voice')) {
      navigation.navigate('VoiceNote');
    } else {
      openMic();
    }
  };

  const _onSpeechError = (event: any) => {
    console.log('_onSpeechError');
    console.log(event.error);
    openMic();
  };

  const openMic = () => {
    setTimeout(() => {
      Voice.start('en-US');
    }, 1000);
    //   setTimeout(() => {
    //     Voice.stop();
    //     setIsRecord(false);
    //   }, 10000);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      openMic();
    });
    openMic();
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
  }, []);
  const goToView = (value: string) => {
    if (choice !== value) {
      let v = '';
      if (value == 'TTS') {
        v = 'Text to speech';
      } else if (value == 'VoiceNote') {
        v = 'Voice note';
      } else if (value == 'Path') {
        v = 'Trajectory';
      } else if (value == 'ObjectDetection') {
        v = 'Object Detection';
      }
      Tts.speak(v);
      setChoice(value);
    } else {
      navigation.navigate(value);
      setChoice('');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles._viewport}>
      <View style={styles._Text_Menu}>
        <Text style={styles._Menu}>Menu</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => goToView('VoiceNote')}
          style={styles.btnView}>
          <View style={styles.layer}>
            <View style={styles.rectangle}>
              <Image
                style={styles.imageIcon}
                source={require('./assets/images/mic.png')}
              />
            </View>
            <Text style={styles.textStyle}>Voice note{'\n'}</Text>
            <Image
              source={require('./assets/images/btn1.png')}
              style={{height: 185, width: '100%'}}></Image>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnView}
          onPress={() => goToView('TTS')}>
          <View style={styles.layer}>
            <View style={styles.rectangle}>
              <Image
                style={styles.imageIcon}
                source={require('./assets/images/docs.png')}
              />
            </View>
            <Text style={styles.textStyle}>Text to speech</Text>
            <Image
              source={require('./assets/images/btn.png')}
              style={{height: 185, width: '100%'}}></Image>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.btnView}
          onPress={() => goToView('ObjectDetection')}>
          <View style={styles.layer}>
            <View style={styles.rectangle}>
              <Image
                style={styles.imageIcon}
                source={require('./assets/images/object.png')}
              />
            </View>

            <Text style={styles.textStyle}>Object Detection</Text>
            <Image
              source={require('./assets/images/btn.png')}
              style={{height: 185, width: '100%'}}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnView}
          onPress={() => goToView('Path')}>
          <View style={styles.layer}>
            <View style={styles.rectangle}>
              <Image
                style={styles.imageIcon}
                source={require('./assets/images/trajictoire.png')}
              />
            </View>
            <Text style={styles.textStyle}>Trajectory</Text>
            <Image
              source={require('./assets/images/btn1.png')}
              style={{height: 185, width: '100%'}}></Image>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default MenuScreen;

const styles = StyleSheet.create({
  _viewport: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
  },

  btnView: {
    position: 'relative',
    width: '40%',
    flex: 1,
    minHeight: 185,
    margin: 10,
  },
  layer: {
    position: 'relative',
    width: '100%',
  },
  rectangle: {
    position: 'absolute',
    zIndex: 10,
    top: 10,
    left: 13,
    width: 48,
    height: 49,
    backgroundColor: 'rgb(252, 220, 217)',
    borderRadius: 12,
  },
  textStyle: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    width: '90%',
    color: 'rgb(0, 0, 0)',
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 29.2969,
    fontFamily: 'DM Sans',
    letterSpacing: -0.375,
    textAlign: 'center',
  },
  imageIcon: {
    width: 38,
    height: 44,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 5,
  },

  _Text_Menu: {
    position: 'relative',
    marginBottom: 20,
    marginTop: 20,
  },
  _Menu: {
    width: '100%',
    marginLeft: 15,
    height: 47,
    color: 'rgb(0, 0, 0)',
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 42.1875,
    fontFamily: 'DM Sans',
    letterSpacing: -0.54,
    textAlign: 'left',
  },
});
