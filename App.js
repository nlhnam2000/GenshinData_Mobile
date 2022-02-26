/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
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
} from 'react-native';
import GenshinDB, {elements} from 'genshin-db';
import {colors} from './assets/colors/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

// screens
import {Characters} from './screens/Characters';
import {WeaponScreen} from './screens/Weapon';
import {SideMenu} from './components/Menu/SideMenu';
import {DetailCharacter} from './screens/Detail/DetailCharacter';
import {DetailWeapon} from './screens/Detail/DetailWeapon';
import {HomeScreen} from './screens/HomeScreen';

Feather.loadFont();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //GenshinDB.setOptions({resultLanguage: 'Vietnamese'});
    // console.log(
    //   GenshinDB.characters('Mondstatd', {
    //     matchCategories: true,
    //     resultLanguage: 'English',
    //   }),
    // );
    // console.log(GenshinDB.materials('Agnidus Agate Sliver'));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="HomeScreen"
          backBehavior="history"
          drawerContent={props => <SideMenu {...props} />}>
          <Drawer.Screen
            component={HomeScreen}
            name="HomeScreen"
            options={{headerShown: false}}
          />
          <Drawer.Screen
            component={Characters}
            name="Characters"
            options={{headerShown: false}}
          />
          <Drawer.Screen
            component={WeaponScreen}
            name="WeaponScreen"
            options={{headerShown: false}}
          />
          <Drawer.Screen
            component={DetailCharacter}
            name="DetailCharacter"
            options={{headerShown: false}}
          />
          <Drawer.Screen
            component={DetailWeapon}
            name="DetailWeapon"
            options={{headerShown: false}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.contentBackground,
  },
});

export default App;
