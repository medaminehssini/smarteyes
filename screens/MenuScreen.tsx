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

type PropsMenuScreen = {
  navigation: any;
};

const MenuScreen = ({navigation}: PropsMenuScreen) => {
  const [choice, setChoice] = useState('');

  useEffect(() => {
    Tts.setDefaultLanguage('fr-FR');
  }, []);
  const goToView = (value: string) => {
    if (choice !== value) {
      let v = '';
      if (value == 'TTS') {
        v = 'Text en vocale';
      } else if (value == 'VoiceNote') {
        v = 'Note vocale';
      } else if (value == 'Path') {
        v = 'Trajectoire';
      } else if (value == 'ObjectDetection') {
        v = 'Detection d’objet';
      }
      Tts.speak(v);
      setChoice(value);
    } else {
      navigation.navigate(value);
      setChoice('');
    }
  };
  return (
    <ScrollView contentContainerStyle={noneModeStyles._viewport}>
      <View style={noneModeStyles._Text_Menu}>
        <Text style={noneModeStyles._Menu}>Menu</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => goToView('VoiceNote')}
          style={noneModeStyles.btnView}>
          <View style={noneModeStyles.layer}>
            <View style={noneModeStyles.rectangle}>
              <Image
                style={noneModeStyles.imageIcon}
                source={require('./assets/images/mic.png')}
              />
            </View>
            <Text style={noneModeStyles.textStyle}>Note vocale{'\n'}</Text>
            <Image
              source={require('./assets/images/btn1.png')}
              style={{height: 185, width: '100%'}}></Image>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={noneModeStyles.btnView}
          onPress={() => goToView('TTS')}>
          <View style={noneModeStyles.layer}>
            <View style={noneModeStyles.rectangle}>
              <Image
                style={noneModeStyles.imageIcon}
                source={require('./assets/images/docs.png')}
              />
            </View>
            <Text style={noneModeStyles.textStyle}>Texte en vocale</Text>
            <Image
              source={require('./assets/images/btn.png')}
              style={{height: 185, width: '100%'}}></Image>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={noneModeStyles.btnView}
          onPress={() => goToView('ObjectDetection')}>
          <View style={noneModeStyles.layer}>
            <View style={noneModeStyles.rectangle}>
              <Image
                style={noneModeStyles.imageIcon}
                source={require('./assets/images/object.png')}
              />
            </View>

            <Text style={noneModeStyles.textStyle}>Detection d’objet</Text>
            <Image
              source={require('./assets/images/btn.png')}
              style={{height: 185, width: '100%'}}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={noneModeStyles.btnView}
          onPress={() => goToView('Path')}>
          <View style={noneModeStyles.layer}>
            <View style={noneModeStyles.rectangle}>
              <Image
                style={noneModeStyles.imageIcon}
                source={require('./assets/images/trajictoire.png')}
              />
            </View>
            <Text style={noneModeStyles.textStyle}>Trajectoire</Text>
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

const noneModeStyles = StyleSheet.create({
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
