package com.smarteyes.mlkit;

import android.graphics.Rect;
import android.net.Uri;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.common.model.LocalModel;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.objects.DetectedObject;
import com.google.mlkit.vision.objects.ObjectDetection;
import com.google.mlkit.vision.objects.ObjectDetector;
import com.google.mlkit.vision.objects.custom.CustomObjectDetectorOptions;


import java.io.IOException;
import java.util.List;

public class ObjectDetectionModule extends ReactContextBaseJavaModule {

    ObjectDetectionModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "ObjectDetectionModule";
    }

    public WritableMap getReactMap (    Rect rect) {
        WritableMap rectObject = Arguments.createMap();

        rectObject.putInt("left" , rect.left);
        rectObject.putInt("top" , rect.top);
        rectObject.putInt("width" , rect.right-rect.left);
        rectObject.putInt("height" , rect.bottom - rect.top);




        return rectObject;
    }

    @ReactMethod
    public void recognizeImage (String url , Promise promise) {
        InputImage image;
        Uri uri = Uri.parse(url);

        LocalModel localModel = new LocalModel.Builder()
                .setAssetFilePath("ob1.tflite")
                // or .setAbsoluteFilePath(absolute file path to model file)
                // or .setUri(URI to model file)
                .build();

        CustomObjectDetectorOptions customObjectDetectorOptions =
                        new CustomObjectDetectorOptions.Builder(localModel)
                                .setDetectorMode(CustomObjectDetectorOptions.SINGLE_IMAGE_MODE)
                                .enableMultipleObjects()
                                .enableClassification()
                                .setClassificationConfidenceThreshold(0.5f)
                                .setMaxPerObjectLabelCount(3)
                                .build();

                ObjectDetector objectDetector =
                        ObjectDetection.getClient(customObjectDetectorOptions);


                //uri

                try {
                    image = InputImage.fromFilePath(getReactApplicationContext(), uri);

                    objectDetector.process(image)
                            .addOnSuccessListener(
                                    result -> {
                                            WritableMap response = Arguments.createMap();
                                            WritableArray objects = Arguments.createArray();
                                            response.putInt("width" , image.getWidth() );
                                            response.putInt("height" , image.getHeight() );

                                        for (DetectedObject detectedObject : result) {

                                                WritableMap blocksObject = Arguments.createMap();

                                                blocksObject.putMap("rect" , getReactMap(detectedObject.getBoundingBox()));
                                                blocksObject.putString("info" , detectedObject.toString());

                                                try{
                                                    if(detectedObject.getLabels().size()>0) {
                                                        DetectedObject.Label label = detectedObject.getLabels().get(0);
                                                        String text = label.getText();

                                                        blocksObject.putString("label", text);

                                                        float confidence = label.getConfidence();

                                                        blocksObject.putDouble("confidence", confidence);
                                                    }

                                                }catch(Exception e ){
                                                    promise.reject("Object Detection is failed", e);
                                                }

                                                objects.pushMap(blocksObject);
                                            }
                                            response.putArray("objects" , objects);
                                            response.putInt("nbr" , result.size());
                                            promise.resolve(response);

                                    })
                            .addOnFailureListener(
                                    new OnFailureListener() {
                                        @Override
                                        public void onFailure(@NonNull Exception e) {
                                            // Task failed with an exception
                                            promise.reject("Object Detection is failed", e);
                                        }
                                    });
                } catch (IOException e) {
                    e.printStackTrace();
                    promise.reject("error 1 ",e);
                }



    }
}
