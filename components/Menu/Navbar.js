import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import RNPickerSelect from 'react-native-picker-select';
import languages from '../../assets/Languages/languages';
import {useSelector, useDispatch} from 'react-redux';
import {SetResultLanguage} from '../../store/action/languages';

const {width} = Dimensions.get('window');

export const Navbar = props => {
  const drawerNavigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const lang = useSelector(state => state.LanguageReducer);

  const handleLanguageChange = value => {
    dispatch(SetResultLanguage(value));
  };

  useEffect(() => {
    console.log(lang);
  }, [lang]);

  return (
    <View style={[styles.headerWrapper, {...props.style, marginTop: insets.top}]}>
      <TouchableOpacity
        // style={styles.backButton}
        onPress={() => drawerNavigation.toggleDrawer()}>
        <Feather name="menu" size={24} color="white" />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: '600',
          color: 'white',
        }}>
        {props.label ?? ''}
      </Text>
      <View>
        <RNPickerSelect
          onValueChange={handleLanguageChange}
          placeholder={{label: 'Select your language', value: null}}
          items={languages}
          style={pickerStyles}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    position: 'relative',
    width: '100%',
    zIndex: 0,
    marginBottom: 10,
    backgroundColor: colors.contentBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    color: 'white',
  },
  inputAndroid: {},
});
