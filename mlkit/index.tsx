import {NativeModules} from 'react-native';
const {TextRecognitionModule, ObjectDetectionModule} = NativeModules;

export type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type Line = {
  text: string;
  rect: Rect;
};

export type Block = {
  text: string;
  rect: Rect;
  lines: Line[];
};

export type Response = {
  width: number;
  height: number;
  blocks: Block[];
};

export type ObjectDetected = {
  label: string;
  confidence: number;
  rect: Rect;
  info: string;
};

export type ResponseObjectDetection = {
  objects: ObjectDetected[];
  nb: number;
  width: number;
  height: number;
};

export const textRecognition = (url: string): Promise<Response> => {
  return TextRecognitionModule.recognizeImage(url);
};

export const objectDetection = (
  url: string,
): Promise<ResponseObjectDetection> => {
  return ObjectDetectionModule.recognizeImage(url);
};
