import React from 'react';
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

const {width} = Dimensions.get('window');

export const Navbar = props => {
  const drawerNavigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => drawerNavigation.toggleDrawer()}>
          <Feather name="menu" size={25} color="white" />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{props.label}</Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.contentBackground}}>Nav</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    marginTop: Platform.OS === 'ios' ? 60 : 0,
  },
  headerWrapper: {
    width: width,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.contentBackground,
    paddingVertical: 10,
  },
});
