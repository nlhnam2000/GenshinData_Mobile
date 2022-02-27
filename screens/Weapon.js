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
import LinearGradient from 'react-native-linear-gradient';
// import {sortedWeapons} from '../global';

import {Navbar} from '../components/Menu/Navbar';

const {width} = Dimensions.get('window');

export const WeaponScreen = props => {
  const drawerNavigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const sorting = ['Claymore', 'Sword', 'Polearm', 'Bow', 'Catalyst'];
  const [currentType, setCurrentType] = useState(sorting[0]);

  const ascendingRarity = weapons => {
    return weapons.sort((a, b) => parseInt(a.rarity) - parseInt(b.rarity));
  };

  useEffect(() => {
    setLoading(false);
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
      <Navbar label={'Weapon list'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{width}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            {sorting.map((label, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.labelButton,
                  {
                    backgroundColor: label === currentType ? colors.background : colors.contentBackground,
                  },
                ]}
                onPress={() => setCurrentType(label)}>
                <Text style={[styles.text, {fontSize: 16}]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.characterWrapper}>
            {GenshinDB.weapons(currentType, {
              matchCategories: true,
            })
              .reverse()
              .map((weapon, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginVertical: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('DetailWeapon', {
                          weapon: GenshinDB.weapons(weapon).name,
                        })
                      }>
                      {GenshinDB.weapons(weapon).rarity === '5' ? (
                        <LinearGradient colors={colors.goldCard} style={[styles.characterItem]}>
                          <Image
                            source={{
                              uri: GenshinDB.weapons(weapon).images.icon,
                            }}
                            style={{width: 100, height: 100}}
                          />
                        </LinearGradient>
                      ) : null}
                      {GenshinDB.weapons(weapon).rarity === '4' ? (
                        <LinearGradient colors={colors.purpleCard} style={[styles.characterItem]}>
                          <Image
                            source={{
                              uri: GenshinDB.weapons(weapon).images.icon,
                            }}
                            style={{width: 100, height: 100}}
                          />
                        </LinearGradient>
                      ) : null}
                      {GenshinDB.weapons(weapon).rarity === '3' ? (
                        <LinearGradient colors={colors.blueCard} style={[styles.characterItem]}>
                          <Image
                            source={{
                              uri: GenshinDB.weapons(weapon).images.icon,
                            }}
                            style={{width: 100, height: 100}}
                          />
                        </LinearGradient>
                      ) : null}
                      {GenshinDB.weapons(weapon).rarity === '2' ? (
                        <LinearGradient colors={colors.greenCard} style={[styles.characterItem]}>
                          <Image
                            source={{
                              uri: GenshinDB.weapons(weapon).images.icon,
                            }}
                            style={{width: 100, height: 100}}
                          />
                        </LinearGradient>
                      ) : null}
                      {GenshinDB.weapons(weapon).rarity === '1' ? (
                        <LinearGradient colors={colors.grayCard} style={[styles.characterItem]}>
                          <Image
                            source={{
                              uri: GenshinDB.weapons(weapon).images.icon,
                            }}
                            style={{width: 100, height: 100}}
                          />
                        </LinearGradient>
                      ) : null}
                    </TouchableOpacity>
                    <View style={styles.characterName}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: 19,
                        }}>
                        {GenshinDB.weapons(weapon).name}
                      </Text>
                      <Text
                        style={{
                          color: colors.text,
                          fontWeight: 'bold',
                          marginTop: 5,
                        }}>
                        Base ATK: {GenshinDB.weapons(weapon).baseatk}
                      </Text>
                      <Text
                        style={{
                          color: colors.text,
                          fontWeight: 'bold',
                        }}>
                        Substat: {GenshinDB.weapons(weapon).substat} {GenshinDB.weapons(weapon).subvalue}
                        {GenshinDB.weapons(weapon).substat.includes('Mastery') ? null : '%'}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  characterWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 20,
    backgroundColor: colors.contentBackground,
    paddingVertical: 10,
    marginBottom: 20,
  },
  characterItem: {
    // marginLeft: 10,
    // marginBottom: 20,
  },
  characterName: {
    backgroundColor: colors.background,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    paddingVertical: 5,
    height: 100,
    width: '100%',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textWhite,
  },
  labelButton: {
    padding: 10,
  },
});
