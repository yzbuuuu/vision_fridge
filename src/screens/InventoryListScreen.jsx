// InventoryListScreen.js

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import InventoryCard from '../components/InventoryCard';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {addItem} from '../store/stateSlice/inventorySlice';

const InventoryListScreen = () => {
  const items = useSelector(state => state.inventory.items);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('添加')}
          style={{marginRight: 10}}>
          <Text>添加</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  

  const renderItem = ({item}) => (
    <InventoryCard
      item={item}
      onEdit={() => console.log('Edit', item.id)}
      onDelete={() => console.log('Delete', item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default InventoryListScreen;
