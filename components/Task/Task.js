import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors/colors';

export const Task = props => {
  return (
    <View style={styles.todoContainer}>
      <Text style={styles.text}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.contentBackground,
    marginTop: 10,
  },
  text: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '500',
  },
});
