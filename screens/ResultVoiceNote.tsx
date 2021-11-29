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

import {Svg, Path} from 'react-native-svg';
import Slider from '@react-native-community/slider';

type Recorded = {
  uri: string;
  time: string;
  day: string;
};
const audioRecorderPlayer = new AudioRecorderPlayer();

const ResultVoiceNote = ({navigation}: any) => {
  const [playing, setPlaying] = useState(Object);
  const [data, setData] = useState(Array);
  const [globalKey, setGlobalKey] = useState(-1);
  const [pause, setPause] = useState(false);
  const storeData = async (uri: string, time: string, day: string) => {
    try {
      const value: Recorded = {
        uri: uri,
        time,
        day,
      };
      data[data.length] = value;
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@sound', jsonValue);
      setData(data);
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
  }, []);
  const onResumePlay = async () => {
    setPause(false);
    setPlaying({...playing, isPlaying: true});

    await audioRecorderPlayer.resumePlayer();
  };
  const onStartPlay = async (path: string, key: number) => {
    if (playing?.currentPositionSec) onStopPlay();
    const msg = await audioRecorderPlayer.startPlayer(path);
    console.log(msg);
    setGlobalKey(key);
    setPause(false);
    console.log(path);
    setPlaying({...playing, isPlaying: true});

    audioRecorderPlayer.addPlayBackListener(e => {
      setPlaying({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        isPlaying: !pause,
        key: key,
        uri: path,
      });
      console.log(playing.isPlaying);

      if (e.duration == e.currentPosition) {
        setPause(true);
        setGlobalKey(-1);
        setPlaying({
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
          isPlaying: false,
          key,
          uri: path,
        });
      }
      return;
    });
  };

  const onStopPlay = async () => {
    setPause(false);
    console.log('onStopPlay');
    setPlaying({...playing, isPlaying: false});

    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };
  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
    setPause(true);
    setPlaying({...playing, isPlaying: false});
    console.log(pause);
  };

  const playNow = () => {
    const uri = playing.uri ? playing.uri : Object(data[0]).uri;
    const key = playing.key ? playing.key : Object(data[0]).key;
    if (pause && playing.currentPositionSec !== playing.currentDurationSec) {
      console.log('paused');

      onResumePlay();
    } else {
      onStartPlay(uri, key);
    }
  };
  const setValueTo = async (value: any) => {
    if (playing.currentPositionSec > 0) {
      await audioRecorderPlayer.seekToPlayer(value);
    }
  };
  return (
    <View style={noneModeStyles._page4}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 25,
            marginTop: 20,
            marginBottom: 20,
            textAlign: 'center',
          }}>
          Liste enregistrée
        </Text>
      </View>
      <View style={{flex: 5}}>
        <ScrollView>
          {data.map((record: any, key) => (
            <TouchableOpacity
              onPress={() => onStartPlay(record.uri, key)}
              style={{
                borderColor: '#ccc',
                borderBottomWidth: 2,
                paddingBottom: 5,
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
              }}
              key={key}>
              <Text
                style={{
                  fontSize: 20,
                  color: globalKey == key ? 'red' : 'black',
                }}>
                Record {key > 99 ? key : key > 9 ? '0' + key : '00' + key}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 5, color: '#bbb', fontSize: 15}}>
                  {record.day}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'right',
                    fontSize: 15,
                    color: '#bbb',
                  }}>
                  {record.time}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Slider
          style={{width: '100%', height: 60}}
          minimumValue={0}
          maximumValue={playing.currentDurationSec}
          value={playing.currentPositionSec}
          minimumTrackTintColor="#FF2047"
          maximumTrackTintColor="#ccc"
          thumbTintColor="red"
          onValueChange={e => setValueTo(e)}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 1, textAlign: 'center'}}>
            {playing.playTime
              ? playing.playTime.substring(0, playing.playTime.length - 3)
              : '00:00'}
          </Text>
          <Text style={{flex: 4, textAlign: 'center'}}>
            {' '}
            Record{' '}
            {playing.key
              ? playing.key > 99
                ? playing.key
                : playing.key > 9
                ? '0' + playing.key
                : '00' + playing.key
              : '000'}{' '}
          </Text>
          <Text style={{flex: 1, textAlign: 'center'}}>
            {playing.duration
              ? playing.duration.substring(0, playing.duration.length - 3)
              : '00:00'}
          </Text>
        </View>
      </View>
      <View style={noneModeStyles.apparei_photo_bar}>
        <View style={noneModeStyles.camera}>
          <View style={noneModeStyles.camera_container}>
            <TouchableOpacity
              onPress={!playing.isPlaying && pause ? playNow : onPausePlay}
              style={noneModeStyles.appareil_photo_container}>
              <View style={noneModeStyles.appareil_photo}>
                <Image
                  style={{height: '80%', width: '80%'}}
                  source={
                    !pause
                      ? require('./assets/images/vocal.png')
                      : require('./assets/images/start.png')
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
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
    </View>
  );
};
export default ResultVoiceNote;

const noneModeStyles = StyleSheet.create({
  _page4: {
    width: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height,
    flexDirection: 'column',
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
    flex: 1,
    width: '100%',
    height: '100%',
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
    height: '100%',
    position: 'relative',
    zIndex: -9,
  },
});
