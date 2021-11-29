import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {ResponseObjectDetectionRender} from '../components/ResponseObjectDetectionRender';
import {objectDetection, ResponseObjectDetection} from '../mlkit';

export const ObjectDetectionScreen = () => {
  const [image, setImage] = useState();
  const [result, setResult] = useState({text: ''});

  const {width: windowWidth} = useWindowDimensions();

  const [Response, setResponse] = useState<ResponseObjectDetection | undefined>(
    undefined,
  );
  const [aspectRatio, setAspectRatio] = useState(2);

  const onTakePhoto = () =>
    launchCamera({mediaType: 'image' as MediaType}, onImageSelect);

  const onSelectImagePress = () =>
    launchImageLibrary({mediaType: 'image' as MediaType}, onImageSelect);

  const onImageSelect = async (media: any) => {
    console.log(media);

    if (!media.didCancel) {
      setImage(media.assets[0].uri);
      try {
        const response = await objectDetection(media.assets[0].uri);
        console.log(response);
        if (response?.objects.length > 0) {
          setAspectRatio(response.height / response.width);
          setResponse(response);
        }
      } catch (error) {
        console.log('erreee   ' + error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Text Recognition</Text>
      <ScrollView>
        <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
        <ScrollView>
          {image && (
            <Image
              source={{uri: image}}
              style={{
                height: windowWidth * aspectRatio,
                width: windowWidth,
                borderRadius: 10,
              }}
            />
          )}
          {!!Response && (
            <ResponseObjectDetectionRender
              response={Response}
              scale={windowWidth / Response.width}
            />
          )}
        </ScrollView>
      </ScrollView>
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 30}}>{result.text}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#47477b',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  image: {
    marginTop: 30,
    borderRadius: 10,
  },
});
