import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchLatestDetectionRequest} from '../store/stateSlice/inventorySlice';
import {expireMap, itemMap} from '../services/itemMap';
import {itemImage} from '../img/imgService';

const MainScreen = ({navigation}) => {
  const latestDetection = useSelector(state => state.inventory.latestDetection);
  const manuallyAdded = useSelector(state => state.manually?.items || []);
  const loading = useSelector(state => state.inventory.loading);
  const dispatch = useDispatch();

  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLatestDetectionRequest());
  }, [dispatch]);

  const data =
    latestDetection?.results
      ?.map(item => ({
        id: item.class_id,
        name: itemMap[item.class_id],
        timestamp: item.timestamp,
        quantity: item.count,
        image: itemImage(item.class_id),
        editable: false, // 标识自动检测的数据不可编辑
        expiryDate: expireMap[item.class_id],
      }))
      .filter(item => item.image !== null) || [];

  // 将手动添加的数据合并到自动检测的数据中，并标识可编辑
  const combinedData = data.concat(
    manuallyAdded.map(item => ({
      ...item,
      editable: true, // 标识手动添加的数据可编辑
    })),
  );

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
  };

  const isExpired = (timestamp, expiryDays) => {
    const currentTime = new Date();
    const storageTime = new Date(timestamp);
    const timeDiff = currentTime - storageTime;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return daysDiff > expiryDays;
  };

  const renderCard = ({item}) => {
    const expired = isExpired(item.timestamp, item.expiryDate);

    return (
      <TouchableOpacity
        style={[styles.card, expired && styles.expiredCard]}
        onPress={() =>
          navigation.navigate('ItemDetail', {item, editable: item.editable})
        }>
        <Image source={item.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={[styles.name, expired && styles.expiredText]}>
            {item.name}
          </Text>
          <Text style={[styles.timestamp, expired && styles.expiredText]}>
            存入时间: {formatTimestamp(item.timestamp)}
          </Text>
          <Text style={[styles.quantity, expired && styles.expiredText]}>
            数量: {item.quantity}
          </Text>
          {expired && <Text style={styles.expiredLabel}>已过保质期</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading && (
        <Modal transparent={true} animationType="none">
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator animating={loading} />
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.topBox}>
        {/* <Text>检测信息</Text> */}
        <Button title="查看检测图像" onPress={() => setShowImageModal(true)} />
      </View>

      <FlatList
        data={combinedData}
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
      />

      {latestDetection.image && (
        <Modal
          visible={showImageModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowImageModal(false)}>
          <View style={styles.imageModal}>
            <Image
              source={{uri: latestDetection.image}}
              style={styles.detectionImage}
            />
            <Button title="关闭" onPress={() => setShowImageModal(false)} />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expiredCard: {
    borderColor: 'red',
    borderWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    justifyContent: 'center',
    flex: 1,
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
  expiredText: {
    color: 'red',
  },
  expiredLabel: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 4,
  },
  imageModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  detectionImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;
