import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ObjectDetected, ResponseObjectDetection} from '../mlkit';
import Tts from 'react-native-tts';

type ResponseObjectDetectionRenderProps = {
  response: ResponseObjectDetection;
  scale: number;
};
export const ResponseObjectDetectionRender = ({
  response,
  scale,
}: ResponseObjectDetectionRenderProps) => {
  return (
    <View style={{position: 'absolute'}}>
      {response.objects.map((object, key) => {
        if (object.label) {
          return <Object key={key} object={object} scale={scale} />;
        }
      })}
    </View>
  );
};

type ObjectProps = {
  object: ObjectDetected;
  scale: number;
};
export const Object = ({object, scale}: ObjectProps) => {
  const rect = useMemo(() => {
    return {
      left: object.rect.left * scale,
      top: object.rect.top * scale,
      width: object.rect.width * scale,
      height: object.rect.height * scale,
    };
  }, [object, scale]);

  const [isPaused, seIsPaused] = useState(false);

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.speak(object.label);
    console.log(object.label);
    return () => {
      Tts.stop();
    };
  }, []);

  const readNow = () => {
    Tts.stop();
    if (object.label) Tts.speak(object.label);
  };

  const pauseNow = () => {
    if (!isPaused) {
      Tts.pause();
    } else {
      Tts.resume();
    }

    seIsPaused(!isPaused);
  };

  return (
    <TouchableOpacity
      onPress={readNow}
      style={{
        position: 'absolute',
        borderColor: 'red',
        borderWidth: 1,
        ...rect,
      }}></TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    height: 35,
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    color: '#2f354b',
    textAlign: 'center',
  },
});
