import React from 'react';
import {StyleSheet} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {colors} from '../../assets/colors/colors';
export const SideMenu = props => {
  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: colors.background}}>
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
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({});
