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
} from 'react-native';
import {colors} from '../assets/colors/colors';
// import {characters} from '../assets/characters/characters';
import GenshinDB from 'genshin-db';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import {Navbar} from '../components/Menu/Navbar';

const {width} = Dimensions.get('window');

export const WeaponScreen = props => {
  const drawerNavigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [weapons, setWeapons] = useState([]);

  useEffect(() => {
    setLoading(false);
    // console.log(GenshinDB.weapons('names', {matchCategories: true}));
    // setWeapons(GenshinDB.weapons('names', {matchCategories: true}));
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.contentWrapper}>
        {/* Mondstatd */}
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            Weapons
          </Text>
          <View style={styles.characterWrapper}>
            {GenshinDB.weapons('names', {matchCategories: true}).map(
              (weapon, index) => (
                <View style={styles.characterItem} key={index}>
                  <Image
                    source={{uri: GenshinDB.weapons(weapon).images.icon}}
                    style={{width: 60, height: 60}}
                  />
                </View>
              ),
            )}
          </View>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerWrapper: {
    width: width,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.contentBackground,
    paddingVertical: 10,
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },
  characterWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '17%',
    flexWrap: 'wrap',
    marginVertical: 20,
  },
  characterItem: {
    padding: 10,
  },
});
