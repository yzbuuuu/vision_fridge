// CustomPicker.jsx
import React, {useState, useRef, useEffect, useCallback, useImperativeHandle, forwardRef} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet, Animated} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const CustomPicker = forwardRef(({label, items, onValueChange}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(items[0].value);
  const [pickerHeight, setPickerHeight] = useState(new Animated.Value(0));

  useImperativeHandle(ref, () => ({
    openPicker: () => setIsOpen(true),
    closePicker: () => setIsOpen(false),
  }));

  useEffect(() => {
    if (isOpen) {
      Animated.timing(pickerHeight, {
        toValue: 200,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(pickerHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isOpen, pickerHeight]);

  const handleValueChange = (value) => {
    setSelectedValue(value);
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.labelContainer} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.label}>{label}: {selectedValue} 天</Text>
      </TouchableOpacity>
      {isOpen && (
        <Animated.View style={[styles.pickerContainer, {height: pickerHeight}]}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            style={styles.picker}
          >
            {items.map(item => (
              <Picker.Item key={item.value} label={`${item.label} 天`} value={item.value} />
            ))}
          </Picker>
        </Animated.View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#888',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  picker: {
    width: '100%',
  },
});

export default CustomPicker;
