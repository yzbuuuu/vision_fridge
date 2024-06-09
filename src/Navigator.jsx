import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import MainScreen from './screens/MainScreen';
import HistoryScreen from './screens/HistoryScreen';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';

import {
  fetchLatestDetectionRequest,
  fetchHistoryRequest,
} from './store/stateSlice/inventorySlice';
import {addItemSuccess} from './store/stateSlice/manuallySlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ItemDetailScreen from './screens/ItemDetailScreen';
import {fetchImageRequest}from './store/stateSlice/inventorySlice'

const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const renderRight = navigation => (
  <Button title="添加物品" onPress={() => navigation.navigate('addModal')} />
);

const renderLeft = dispatch => (
  <Button title="刷新" onPress={() => dispatch(fetchImageRequest())} />
);

const AddModal = ({navigation}) => {
  console.log('addmodalactivated');
  // const manuallyAddItem = useSelector(state => state.manually.items);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [timestamp, setCurrentDateTime] = useState(new Date().toString());

  const updateDateTime = () => {
    setCurrentDateTime(new Date().toLocaleString().toString());
  };

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (!response.didCancel && !response.error) {
          setImage(response.assets[0].uri);
          setImageBase64(response.assets[0].base64);
        }
      },
    );
  };

  const handleTakePhoto = async () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          console.log('用户取消了拍照');
        } else if (response.errorCode) {
          console.log('拍照错误: ', response.errorMessage);
        } else {
          setImage(response.assets[0].uri);
          setImageBase64(response.assets[0].base64);
        }
      },
    );
  };

  const missingErrorAlert = att => {
    Alert.alert(
      '错误',
      att + '不能为空！',
      [{text: '确定', onPress: () => console.log('确定按下')}],
      {cancelable: false},
    );
  };

  const handleAddItem = () => {
    updateDateTime();
    if (name === '') {
      missingErrorAlert('物品名称');
      return;
    } else if (quantity === '') {
      missingErrorAlert('数量');
      return;
    }
    dispatch(
      addItemSuccess({
        image,
        imageBase64,
        name,
        quantity,
        expiryDate,
        timestamp,
      }),
    );

    console.log({
      // image,
      // imageBase64,
      name,
      quantity,
      expiryDate,
      currentDateTime: timestamp,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>物品图像</Text>
      {image ? (
        <Image source={{uri: image}} style={styles.image} />
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

const MainStackNavigator = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <MainStack.Navigator mode="modal">
      <MainStack.Screen
        name="mainScreen"
        component={MainScreen}
        options={{
          title: '冰箱库存',
          headerRight: () => renderRight(navigation),
          headerLeft: () => renderLeft(dispatch),
        }}
      />
      <MainStack.Screen
        name="addModal"
        component={AddModal}
        options={{title: '添加物品'}}
      />
      <MainStack.Screen
        name="ItemDetail"
        component={ItemDetailScreen}
        options={{title: '详细信息'}}
      />
    </MainStack.Navigator>
  );
};

const Navigation = () => {
  // const dispatch = useDispatch();
  // console.log('dispatch fetchLatestDetectionRequest???')
  // dispatch(fetchLatestDetectionRequest());
  // dispatch(fetchHistoryRequest());

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Main">
        <Tab.Screen
          name="Main"
          component={MainStackNavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{title: '历史记录'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

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
