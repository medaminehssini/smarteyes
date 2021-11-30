import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Line, Response} from '../mlkit';
import Tts from 'react-native-tts';

type ResponseRendererProps = {
  response: Response;
  scale: number;
};
export const ResponseRenderer = ({response, scale}: ResponseRendererProps) => {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      {response.blocks.map(block =>
        block.lines.map((line, key) => {
          return <Block key={key} line={line} scale={scale} />;
        }),
      )}
    </View>
  );
};

type BlockProps = {
  line: Line;
  scale: number;
};
export const Block = ({line, scale}: BlockProps) => {
  const rect = useMemo(() => {
    return {
      left: line.rect.left * scale,
      top: line.rect.top * scale,
      width: line.rect.width * scale,
      height: line.rect.height * scale,
    };
  }, [line, scale]);

  const [isPaused, seIsPaused] = useState(false);

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.speak(line.text);

    return () => {
      Tts.stop();
    };
  }, []);

  const readNow = () => {
    Tts.stop();
    Tts.speak(line.text);
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
      }}>
      {/* <Text style={{color: 'blue'}}>{line.text}</Text> */}
    </TouchableOpacity>
  );
};
