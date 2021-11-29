import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';

import {Svg, Path} from 'react-native-svg';
import Tts from 'react-native-tts';
import {zIndex} from 'styled-system';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const VoiceNoteScreen = ({navigation}: any) => {
  const [duration, setduration] = useState(0);
  const [recording, setRecording] = useState(Object);
  const [data, setData] = useState(Array);
  const [uri, setUri] = useState('');

  const storeData = async (uri: string, time: string, day: string) => {
    try {
      const dataJson = data;
      const value = {
        uri,
        time,
        day,
      };
      dataJson[dataJson.length] = value;
      const jsonValue = JSON.stringify(dataJson);
      await AsyncStorage.setItem('@sound', jsonValue);
      setData(dataJson);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@sound');
      if (value !== null) {
        // value previously stored
        const dataJson = JSON.parse(value);
        setData(dataJson);
        console.log(dataJson);
      }
    } catch (e) {
      // error reading value
      return null;
    }
  };

  useEffect(() => {
    getData();
    Tts.setDefaultLanguage('fr-FR');
  }, []);

  const onStartRecord = async () => {
    Tts.speak("L'enregistrement vocal a commencé");

    const dirs = RNFetchBlob.fs.dirs;
    const path = Platform.select({
      ios: data.length + '.m4a',
      android: `${dirs.CacheDir}/${data.length}.mp3`,
    });
    const uri = await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecording({
        recordSecs: e.currentPosition,
        isRecording: true,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
    console.log(uri);
  };

  const onStopRecord = async () => {
    Tts.speak('Enregistrement audio terminé');
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    const t = recording.recordTime.substring(
      0,
      recording.recordTime.length - 3,
    );
    setUri(result);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const today1 = mm + '/' + dd + '/' + yyyy;
    storeData(result, t, today1);

    setRecording({
      recordTime: t,
      recordSecs: 0,
    });
    navigation.navigate('ResultVoiceNote');
    console.log(result);
  };

  return (
    <View style={noneModeStyles._page4}>
      <TouchableOpacity
        onPress={recording.isRecording ? onStopRecord : onStartRecord}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          zIndex: 5,
        }}></TouchableOpacity>
      <View style={noneModeStyles.rectangle}>
        <View style={noneModeStyles.textContainer}>
          <Text style={noneModeStyles.recordText}>
            Enregistrement n°{data.length > 0 ? data.length - 1 : '0'}
          </Text>
        </View>
        <View style={noneModeStyles.waves}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={require('./assets/images/v.png')}
          />
          <Text style={noneModeStyles.wavesText}>
            {recording.recordTime ? recording.recordTime : '00:00'}
          </Text>
        </View>
      </View>
      <View style={noneModeStyles.apparei_photo_bar}>
        <View style={noneModeStyles.camera}>
          <View style={noneModeStyles.camera_container}>
            <TouchableOpacity
              style={noneModeStyles.appareil_photo_container}
              onPress={recording.isRecording ? onStopRecord : onStartRecord}>
              <View style={noneModeStyles.appareil_photo}>
                <Image
                  style={{height: '80%', width: '80%'}}
                  source={
                    recording.isRecording
                      ? require('./assets/images/vocal.png')
                      : require('./assets/images/mic.png')
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={noneModeStyles.box}>
          <View>
            <Svg style={{height: 101, width: 414}} viewBox="0 0 414 101">
              <Path
                fill={'#C2C3CE'}
                fillRule={'evenodd'}
                clipRule={'evenodd'}
                d="M152.596 15.5738C149.85 7.23706 142.929 0 134.151 0H0V85C0 93.8366 7.16345 101 16 101H398C406.837 101 414 93.8366 414 85V0H282.349C273.571 0 266.645 7.25689 263.717 15.5315C255.443 38.9186 230.141 55.9759 207 55.9759C183.873 55.9759 160.291 38.9392 152.596 15.5738Z"
              />
            </Svg>
          </View>
        </View>
      </View>
    </View>
  );
};

const noneModeStyles = StyleSheet.create({
  _page4: {
    width: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height,
  },
  rectangle: {
    width: '90%',
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 20,
    height: Dimensions.get('window').height - 165,
    backgroundColor: 'rgb(194, 196, 207)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  recordText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textContainer: {
    position: 'absolute',
    top: 45,
  },
  waves: {
    width: '90%',
    height: 120,
  },
  wavesText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 23,
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
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 150,
    position: 'relative',
    zIndex: -9,
  },
});
