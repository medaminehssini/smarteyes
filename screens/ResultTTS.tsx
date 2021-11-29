import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import {ResponseRenderer} from '../components/ResponseRenderer';
import TransparentHeader from '../components/TransparentHeader';

type PropsResultTTS = {
  navigation: any;
  route: any;
  url: string;
};

const ResultTTS = ({navigation, route}: PropsResultTTS) => {
  const {url, response} = route.params;
  const aspectRatio = response.height / (response.width - 40);
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  useEffect(() => {
    console.log(route.params);
  }, []);
  return (
    <View style={noneModeStyles._page2}>
      <View style={{height: 70}}>
        <TransparentHeader color="black" navigation={navigation} />
      </View>
      <View style={noneModeStyles.document_container}>
        <View style={noneModeStyles._document}>
          <Image
            style={{
              height: (windowWidth - 40) * aspectRatio,
              width: windowWidth - 40,
              borderRadius: 10,
            }}
            source={{uri: url}}
          />
          {!!response && (
            <ResponseRenderer
              response={response}
              scale={(windowWidth - 40) / (response.width - 40)}
            />
          )}
        </View>
      </View>
      <View style={noneModeStyles.apparei_photo_bar}>
        <View style={noneModeStyles.camera}>
          <TouchableOpacity style={noneModeStyles.camera_container}>
            <View style={noneModeStyles.appareil_photo_container}>
              <View style={noneModeStyles.appareil_photo}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  source={require('./assets/images/vocal.png')}
                />
              </View>
            </View>
          </TouchableOpacity>
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
export default ResultTTS;

const noneModeStyles = StyleSheet.create({
  _page2: {
    backgroundColor: 'rgb(255, 255, 255)',
    justifyContent: 'center',
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
    height: 150,
  },
  document_container: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height - 220,
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 20,
  },
  _document: {},
});
