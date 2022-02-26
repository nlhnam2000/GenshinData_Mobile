import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {colors} from '../../assets/colors/colors';
export const SideMenu = props => {
  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: colors.background, paddingHorizontal: 10}}>
      <View style={styles.menuWrapper}>
        <DrawerItem
          label={'Home'}
          labelStyle={{color: 'white', fontWeight: '600', fontSize: 18}}
          onPress={() => props.navigation.navigate('HomeScreen')}
        />
        <DrawerItem
          label={'Character'}
          labelStyle={{color: 'white', fontWeight: '600', fontSize: 18}}
          onPress={() => props.navigation.navigate('Characters')}
        />
        <DrawerItem
          label={'Weapon'}
          labelStyle={{color: 'white', fontWeight: '600', fontSize: 18}}
          onPress={() => props.navigation.navigate('WeaponScreen')}
        />
        <DrawerItem
          label={'Tier list'}
          labelStyle={{color: 'white', fontWeight: '600', fontSize: 18}}
        />
        <DrawerItem
          label={'Todo'}
          labelStyle={{color: 'white', fontWeight: '600', fontSize: 18}}
        />
        <DrawerItem
          label={'Database'}
          labelStyle={{color: 'white', fontWeight: '600', fontSize: 18}}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  menuWrapper: {},
});
