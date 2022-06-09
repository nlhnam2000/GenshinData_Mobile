import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Keyboard,
} from 'react-native';
import {colors} from '../assets/colors/colors';
import {Navbar} from '../components/Menu/Navbar';
import Feather from 'react-native-vector-icons/Feather';
import {Task} from '../components/Task/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Todos = props => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [taskItem, setTaskItem] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const LoadTodoList = async () => {
      const todo = await AsyncStorage.getItem('@todoList');
      setTaskItem(todo !== null ? JSON.parse(todo) : []);
      setLoading(false);
    };

    LoadTodoList();
  }, []);

  const addTask = async () => {
    if (task !== null || task !== '') {
      Keyboard.dismiss();
      let newTodo = [...taskItem, task];
      setTaskItem(newTodo);
      await AsyncStorage.setItem('@todoList', JSON.stringify(newTodo));
      setTask(null);
      inputRef.current.clear();
    }
  };

  const deleteTask = async index => {
    let copy = [...taskItem];
    copy.splice(index, 1);
    setTaskItem(copy);
    await AsyncStorage.setItem('@todoList', JSON.stringify(copy));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={'white'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar label="Todo list" />
      <SafeAreaView style={styles.wrapper}>
        <ScrollView style={{width: '100%', height: '80%', padding: 10}}>
          <Text style={styles.heading}>Create your todo list here</Text>
          {taskItem.map((task, index) => (
            <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
              <Task label={task} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardWrapper}>
        <TextInput
          style={styles.inputField}
          onChangeText={text => setTask(text)}
          ref={inputRef}
          onSubmitEditing={event => {
            addTask();
          }}
          returnKeyType="done"
        />
        <TouchableOpacity
          onPress={() => addTask()}
          style={{padding: 10, borderRadius: 40, backgroundColor: colors.contentBackground2}}>
          <Feather name="plus" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  wrapper: {
    width: '100%',
    padding: 20,
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  text: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '500',
  },
  keyboardWrapper: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  inputField: {
    backgroundColor: colors.contentBackground2,
    color: 'white',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  todoContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.contentBackground,
    marginTop: 10,
  },
});
