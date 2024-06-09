// AddModal.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItemSuccess } from '../store/stateSlice/manuallySlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddModal = ({ navigation }) => {
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toISOString());

  const handleSelectImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      response => {
        if (!response.didCancel && !response.error) {
          setImageUri(response.assets[0].uri);
          setImageBase64(response.assets[0].base64);
        }
      }
    );
  };

  const handleTakePhoto = async () => {
    launchCamera(
      { mediaType: 'photo', saveToPhotos: true, includeBase64: true },
      response => {
        if (response.didCancel) {
          console.log('用户取消了拍照');
        } else if (response.errorCode) {
          console.log('拍照错误: ', response.errorMessage);
        } else {
          setImageUri(response.assets[0].uri);
          setImageBase64(response.assets[0].base64);
        }
      }
    );
  };

  const missingErrorAlert = (att) => {
    Alert.alert(
      '错误',
      `${att}不能为空！`,
      [{ text: '确定', onPress: () => console.log('确定按下') }],
      { cancelable: false }
    );
  };

  const handleAddItem = () => {
    if (name === '') {
      missingErrorAlert('物品名称');
      return;
    }
    if (quantity === '') {
      missingErrorAlert('数量');
      return;
    }
    dispatch(addItemSuccess({
      id: new Date().getTime(), // 给每个手动添加的物品一个唯一ID
      name,
      timestamp: currentDateTime,
      quantity,
      image: { uri: imageUri },
      imageBase64,
    }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>物品图像</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text>未选择图像</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="从相册选择" onPress={handleSelectImage} />
        <Button title="拍照" onPress={handleTakePhoto} />
      </View>

      <Text style={styles.label}>物品名称</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="请输入物品名称"
      />

      <Text style={styles.label}>数量</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="请输入数量"
        keyboardType="numeric"
      />

      <Text style={styles.label}>保质期</Text>
      <TextInput
        style={styles.input}
        value={expiryDate}
        onChangeText={setExpiryDate}
        placeholder="请输入保质期"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>添加物品</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddModal;
