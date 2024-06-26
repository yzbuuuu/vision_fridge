// HistoryScreen.jsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoryRequest } from '../store/stateSlice/inventorySlice';

const HistoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.inventory.history);
  const loading = useSelector(state => state.inventory.loading);

  useEffect(() => {
    dispatch(fetchHistoryRequest());
  }, [dispatch]);

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('HistoryDetail', { item })}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{new Date(item.timestamp).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
});

export default HistoryScreen;
