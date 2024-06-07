import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchLatestDetectionRequest} from '../store/stateSlice/inventorySlice';
import {itemMap} from '../services/itemMap';
import {itemImage} from '../img/imgService';

const results = [
  {
    class_id: '7',
    count: 1,
    timestamp: '2024-06-02T16:00:00Z',
  },
  {
    class_id: '8',
    count: 1,
    timestamp: '2024-06-02T13:30:20Z',
  },
  {
    class_id: '21',
    count: 4,
    timestamp: '2024-06-02T13:30:20Z',
  },
  {
    class_id: '18',
    count: 1,
    timestamp: '2024-06-02T13:33:39Z',
  },
  {
    class_id: '19',
    count: 1,
    timestamp: '2024-06-02T16:00:00Z',
  },
];

const MainScreen = ({navigation}) => {
  const latestDetection = useSelector(state => state.inventory.latestDetection);
  const dispatch = useDispatch();
  const [displayMode, setDisplayMode] = useState('缩略');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLatestDetectionRequest());
  }, [dispatch]);

  console.log('showlatestDetection');

  // const data = latestDetection?.results?.map(item => ({
  //   id: item.class_id,
  //   name: itemMap[item.class_id],
  //   timestamp: item.timestamp,
  //   quantity: item.count,
  //   image: itemImage(item.class_id),
  // }));
  const data = results?.map(item => ({
    id: item.class_id,
    name: itemMap[item.class_id],
    timestamp: item.timestamp,
    quantity: item.count,
    image: itemImage(item.class_id),
  }));
  console.log('data::::');
  // console.log(data);

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
  };

  const renderCard = ({item}) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.timestamp}>
          存入时间: {formatTimestamp(item.timestamp)}
        </Text>
        <Text style={styles.quantity}>数量: {item.quantity}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleDisplayModeChange = mode => {
    setDisplayMode(mode);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    marginLeft: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  quantity: {
    fontSize: 12,
    color: '#888',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -50}, {translateY: -50}],
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalOption: {
    fontSize: 18,
    padding: 10,
  },
});

export default MainScreen;
