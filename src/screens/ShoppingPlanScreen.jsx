import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, toggleItem, removeItem } from '../store/stateSlice/shoppingPlanSlice';

const ShoppingPlanScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const items = useSelector((state) => state.shoppingPlan.items);

  const handleAddItem = () => {
    if (inputValue.trim()) {
      dispatch(addItem(inputValue.trim()));
      setInputValue('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => dispatch(toggleItem(item.id))}>
        <Text style={item.completed ? styles.itemTextCompleted : styles.itemText}>
          {item.name}
        </Text>
      </TouchableOpacity>
      <Button title="删除" onPress={() => dispatch(removeItem(item.id))} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="物品名称"
        />
        <Button title="添加" onPress={handleAddItem} />
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
  },
  itemTextCompleted: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default ShoppingPlanScreen;
