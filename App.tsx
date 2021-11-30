/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {HomeScreen} from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import {ObjectDetectionScreen} from './screens/ObjectDetectionScreen';
import {PathScreen} from './screens/PathScreen';
import ResultObjectDetectionScreen from './screens/ResultObjectDetectionScreen';
import ResultTTS from './screens/ResultTTS';
import ResultVoiceNote from './screens/ResultVoiceNote';
import {TestScreen} from './screens/TestScreen';
import {TTSScreen} from './screens/TTSScreen';
import {VoiceNoteScreen} from './screens/VoiceNoteScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Test"
          component={TestScreen}
          options={{headerShown: false}}
        /> */}

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResultObjectDetection"
          component={ResultObjectDetectionScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ResultVoiceNote"
          component={ResultVoiceNote}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResultTTS"
          component={ResultTTS}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TTS"
          component={TTSScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ObjectDetection"
          component={ObjectDetectionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VoiceNote"
          component={VoiceNoteScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Path"
          component={PathScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
