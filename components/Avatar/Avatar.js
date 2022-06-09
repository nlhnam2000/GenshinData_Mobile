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
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GenshinDB from 'genshin-db';
import {colors} from '../../assets/colors/colors';

export const Avatar = props => {
  return (
    <View>
      <LinearGradient colors={props.rarity === 4 ? colors.purpleCard : colors.goldCard}>
        <Image
          source={{
            uri: props.source,
          }}
          style={{width: 80, height: 80}}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
