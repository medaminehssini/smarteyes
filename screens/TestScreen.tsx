import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import Svg, {Path} from 'react-native-svg';
import {textRecognition} from '../mlkit';

import TransparentHeader from '../components/TransparentHeader';
import Tts from 'react-native-tts';

export const TestScreen = ({navigation}: any) => {
  const [{cameraRef}, {takePicture}] = useCamera();

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
  }, []);

  const onTakePhoto = async () => {
    try {
      const data = await takePicture();
      console.log(data.uri);
      const uri: string = data.uri;
      try {
        const response = await textRecognition(uri);
        console.log(response);
        if (response?.blocks.length > 0) {
          Tts.speak('La photo est capturé avec succès');
          navigation.navigate('ResultTTS', {
            url: uri,
            response: response,
          });
        } else {
          //Speak not found
          Tts.speak('Merci de reprendre la photo');
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={onTakePhoto} style={noneModeStyles._page2}>
      <TransparentHeader navigation={navigation} />

      <View style={noneModeStyles.document_container}>
        <TouchableOpacity
          onPress={onTakePhoto}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
          }}></TouchableOpacity>
        <RNCamera ref={cameraRef} style={noneModeStyles._document}></RNCamera>
      </View>
      <View style={noneModeStyles.apparei_photo_bar}>
        <View style={noneModeStyles.camera}>
          <TouchableOpacity
            style={noneModeStyles.camera_container}
            onPress={onTakePhoto}>
            <View style={noneModeStyles.appareil_photo_container}>
              <View style={noneModeStyles.appareil_photo}>
                <Image
                  style={{height: '95%', width: '95%'}}
                  source={require('./assets/images/camera.png')}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={noneModeStyles.box}>
          <Svg style={{height: '100%', width: '100%'}}>
            <Path
              fill={'#C2C3CE'}
              fillRule={'evenodd'}
              clipRule={'evenodd'}
              d="M152.596 15.5738C149.85 7.23706 142.929 0 134.151 0H0V85C0 93.8366 7.16345 101 16 101H398C406.837 101 414 93.8366 414 85V0H282.349C273.571 0 266.645 7.25689 263.717 15.5315C255.443 38.9186 230.141 55.9759 207 55.9759C183.873 55.9759 160.291 38.9392 152.596 15.5738Z"
            />
          </Svg>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const noneModeStyles = StyleSheet.create({
  _page2: {
    backgroundColor: 'rgb(255, 255, 255)',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  apparei_photo_bar: {
    width: '100%',
    height: 150,
    marginTop: 2,
  },
  appareil_photo_container: {
    width: 59,
    height: 57,
  },
  appareil_photo: {
    width: '100%',
    height: '100%',
  },
  camera_container: {
    width: 75,
    height: 78,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderStyle: 'solid',
    borderColor: 'rgb(255, 32, 71)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: '43%',
  },
  camera: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    height: 60,
    position: 'relative',
  },
  box: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: -1,
  },
  document_container: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height - 115,
    marginTop: 0,
    marginRight: 25,
    marginLeft: 25,
    borderRadius: 20,
    zIndex: -2,
    position: 'relative',
  },
  _document: {
    width: '100%',
    height: Dimensions.get('window').height + 10,
  },
});
