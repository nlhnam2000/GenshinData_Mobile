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

export const Todos = props => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [taskItem, setTaskItem] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    setLoading(false);
  }, []);

  const addTask = () => {
    if (task !== null || task !== '') {
      Keyboard.dismiss();
      setTaskItem(prev => [...prev, task]);
      setTask(null);
      inputRef.current.clear();
    }
  };

  const deleteTask = index => {
    let copy = [...taskItem];
    copy.splice(index, 1);
    setTaskItem(copy);
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
        <ScrollView style={{width: '100%', height: '80%', padding: 20}}>
          <Text style={styles.heading}>Create your todo list here</Text>
          {taskItem.map((task, index) => (
            <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
              <Task label={task} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardWrapper}>
        <TextInput style={styles.inputField} onChangeText={text => setTask(text)} ref={inputRef} />
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
