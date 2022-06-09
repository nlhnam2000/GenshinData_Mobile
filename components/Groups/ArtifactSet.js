import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Modal,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {colors} from '../assets/colors/colors';
import GenshinDB from 'genshin-db';

export const ArtifactSet = props => {
  return (
    <View style={styles.artifactWrapper}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.artifact}>
          <Image source={{uri: selectedCharacter.weapon.icon}} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.artifact}>
          <Image source={{uri: selectedCharacter.artifacts[0].icon}} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.artifact}>
          <Image source={{uri: selectedCharacter.artifacts[1].icon}} style={{width: 40, height: 40}} />
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.artifact}>
          <Image source={{uri: selectedCharacter.artifacts[2].icon}} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.artifact}>
          <Image source={{uri: selectedCharacter.artifacts[3].icon}} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.artifact}>
          <Image source={{uri: selectedCharacter.artifacts[4].icon}} style={{width: 40, height: 40}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  artifactWrapper: {
    flexDirection: 'row',
    margin: 15,
  },
  artifact: {
    borderRadius: 10,
    padding: 5,
    borderColor: colors.textWhite,
    borderWidth: 1,
    marginBottom: 10,
  },
  left: {
    marginRight: 10,
  },
  right: {
    marginTop: 30,
  },
});
