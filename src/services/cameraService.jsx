import React, {useState} from 'react';
import {View, Button, Image, Alert, Platform} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
  ImagePickerResponse,
} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

// export const [imageUri, setImageUri] = useState(null);

export const handleCameraLaunch = () => {
  launchCamera(
    {
      mediaType: 'photo',
      saveToPhotos: true,
    },
    response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = response.assets[0].uri;
        // setImageUri(source);
        saveImage(source);
      }
    },
  );
};

export const handleImageLibraryLaunch = () => {
  launchImageLibrary(
    {
      mediaType: 'photo',
    },
    response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = response.assets[0].uri;
        // setImageUri(source);
        saveImage(source);
      }
    },
  );
};

export const saveImage = async uri => {
  try {
    const fileName = `photo-${Date.now()}.jpg`; // 使用时间戳作为文件名，避免重名
    const newFilePath = Platform.select({
      ios: `${RNFS.DocumentDirectoryPath}/${fileName}`,
      android: `${RNFS.ExternalDirectoryPath}/${fileName}`,
    });
    await RNFS.copyFile(uri, newFilePath);
    Alert.alert('Success', 'Image saved to ' + newFilePath);
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Failed to save image');
  }
};

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Button title="Take Photo" onPress={handleCameraLaunch} />
//       <Button title="Choose from Library" onPress={handleImageLibraryLaunch} />
//       {imageUri && (
//         <Image
//           source={{uri: imageUri}}
//           style={{width: 200, height: 200, marginTop: 20}}
//         />
//       )}
//     </View>
//   );

// export default App;
