import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
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
  BackHandler,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import GenshinDB from 'genshin-db';
import LinearGradient from 'react-native-linear-gradient';
import Markdown from 'react-native-markdown-package';
import {MaterialDialog} from '../../components/Dialog/MaterialDialog';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

export const DetailWeapon = props => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [materialClicked, setMaterialClicked] = useState('');
  const [refinementLevel, setRefinementLevel] = useState(1);

  const levels = [
    '1',
    '20 -',
    '20 +',
    '40 -',
    '40 +',
    '50 -',
    '50 +',
    '60 -',
    '60 +',
    '70 -',
    '70 +',
    '80 -',
    '80 +',
    '90',
  ];
  const ascensions = [
    {
      label: 'Ascension 1',
      key: 'ascend1',
    },
    {
      label: 'Ascension 2',
      key: 'ascend2',
    },
    {
      label: 'Ascension 3',
      key: 'ascend3',
    },
    {
      label: 'Ascension 4',
      key: 'ascend4',
    },
    {
      label: 'Ascension 5',
      key: 'ascend5',
    },
    {
      label: 'Ascension 6',
      key: 'ascend6',
    },
  ];
  const [levelIndex, setLevelIndex] = useState(0);
  const [weaponLevel, setWeaponLevel] = useState(levels[levelIndex]);
  const weapon = props.route.params.weapon;

  const increaseLevel = () => {
    if (levelIndex < levels.length - 1) {
      setLevelIndex(prev => prev + 1);
    }
  };

  const decreaseLevel = () => {
    if (levelIndex > 0) {
      setLevelIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    setWeaponLevel(levels[levelIndex]);
  }, [levelIndex]);

  const parseEffect = (str, rank) => {
    let r = GenshinDB.weapons(weapon)['r' + rank];
    let splitted = str.split(' ');
    let index = 0;
    splitted.forEach(s => {
      if (s.includes('{') && s.includes('}')) {
        let params = s.substring(s.indexOf('{') + 1, s.indexOf('}'));
        splitted[index] = '**' + r[params] + '**';
      }
      index++;
    });

    return splitted.join(' ');
  };

  const increaseRefinementLevel = () => {
    if (refinementLevel < 5) {
      setRefinementLevel(prev => prev + 1);
    }
  };

  const decreaseRefinementLevel = () => {
    if (refinementLevel > 1) {
      setRefinementLevel(prev => prev - 1);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const hanldeBackButton = () => {
        setOpenModal(false);
        props.navigation.goBack();

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', hanldeBackButton);

      return () => BackHandler.removeEventListener('hardwareBackPress', hanldeBackButton);
    }, [openModal]),
  );

  useEffect(() => {
    // console.log(GenshinDB.weapons(weapon).costs['ascend' + 1]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }

  return (
    <View style={[styles.container, {paddingTop: Platform.OS === 'ios' ? insets.top : 10}]}>
      <View style={styles.headerWrapper}>
        <Feather name="arrow-left" size={24} color={'white'} onPress={() => props.navigation.goBack('WeaponScreen')} />
      </View>
      <ScrollView>
        <View
          style={{
            width,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View style={styles.contentWrapper}>
            <View style={styles.contentHeader}>
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

              <View style={styles.infoWrapper}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    style={{
                      color: colors.textWhite,
                      fontWeight: 'bold',
                      fontSize: 19,
                      marginRight: 5,
                    }}>
                    {GenshinDB.weapons(weapon).name} ({GenshinDB.weapons(weapon).rarity}{' '}
                    <Feather name="star" size={24} color={colors.textWhite} />)
                  </Text>
                </View>
                <Text
                  style={{
                    color: colors.textWhite,
                    fontWeight: 'bold',
                  }}>
                  Type: {GenshinDB.weapons(weapon).weapontype}
                </Text>
                <Text
                  style={{
                    color: colors.textWhite,
                    fontWeight: 'bold',
                  }}>
                  Substat: {GenshinDB.weapons(weapon).substat}
                </Text>
              </View>
            </View>
            {/* content */}
            <View style={styles.descriptionWrapper}>
              <Text
                style={[
                  styles.text,
                  {
                    color: 'white',
                    marginBottom: 10,
                    fontSize: 22,
                    fontWeight: 'bold',
                  },
                ]}>
                Description
              </Text>
              <Text style={styles.text}>{GenshinDB.weapons(weapon).description}</Text>
            </View>
            {/* Stats */}
            <View style={styles.statWrapper}>
              <View style={styles.statLabel}>
                <Text
                  style={[
                    styles.text,
                    {
                      color: 'white',
                      marginBottom: 10,
                      fontSize: 22,
                      fontWeight: 'bold',
                    },
                  ]}>
                  Stats
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Feather
                    name="minus-circle"
                    size={22}
                    color={colors.text}
                    style={{marginRight: 10}}
                    onPress={() => decreaseLevel()}
                  />
                  <Feather name="plus-circle" size={22} color={colors.text} onPress={() => increaseLevel()} />
                </View>
              </View>
              <View style={styles.statContentWrapper}>
                <View style={styles.statContent}>
                  <Text style={[styles.text, {marginBottom: 10}]}>
                    Base ATK:{' '}
                    {GenshinDB.weapons(weapon)
                      .stats(weaponLevel.split(' ')[0], weaponLevel.split(' ')[1])
                      .attack.toFixed(0)}
                  </Text>
                  <Text style={[styles.text, {marginBottom: 10}]}>
                    Level: {GenshinDB.weapons(weapon).stats(weaponLevel.split(' ')[0], weaponLevel.split(' ')[1]).level}
                  </Text>
                </View>
                <View style={styles.statContent}>
                  <Text style={[styles.text, {marginBottom: 10}]}>
                    {GenshinDB.weapons(weapon).substat}:{' '}
                    {(
                      GenshinDB.weapons(weapon).stats(weaponLevel.split(' ')[0], weaponLevel.split(' ')[1])
                        .specialized * 100
                    ).toFixed(1)}
                    %
                  </Text>
                  <Text style={[styles.text, {marginBottom: 10}]}>
                    Ascension:{' '}
                    {GenshinDB.weapons(weapon).stats(weaponLevel.split(' ')[0], weaponLevel.split(' ')[1]).ascension}
                  </Text>
                </View>
              </View>
            </View>
            {/* Refinement */}
            <View style={styles.statWrapper}>
              <View style={styles.statLabel}>
                <Text
                  style={[
                    styles.text,
                    {
                      color: 'white',
                      marginBottom: 10,
                      fontSize: 22,
                      fontWeight: 'bold',
                    },
                  ]}>
                  Refinement
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Feather
                    name="minus-circle"
                    size={22}
                    color={colors.text}
                    style={{marginRight: 10}}
                    onPress={() => decreaseRefinementLevel()}
                  />
                  <Text style={[styles.text, {marginRight: 10}]}>{refinementLevel}</Text>
                  <Feather name="plus-circle" size={22} color={colors.text} onPress={() => increaseRefinementLevel()} />
                </View>
              </View>
              <Markdown styles={markdownStyles.text}>
                {parseEffect(GenshinDB.weapons(weapon).effect, refinementLevel)}
              </Markdown>
            </View>
            {/* Material */}
            <View style={styles.statWrapper}>
              <Text
                style={[
                  styles.text,
                  {
                    color: 'white',
                    marginBottom: 10,
                    fontSize: 22,
                    fontWeight: 'bold',
                  },
                ]}>
                Ascension materials
              </Text>
              <View style={{width: '100%', marginTop: 10}}>
                {ascensions.map((ascend, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 10,
                      marginBottom: 10,
                      backgroundColor: index % 2 === 0 ? colors.contentBackground : colors.contentBackground2,
                    }}>
                    <Text style={styles.text}>{ascend.label}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      {GenshinDB.weapons(weapon).costs[ascend.key].map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                setMaterialClicked(item.name);
                                setOpenModal(true);
                              }}>
                              <Image
                                source={{
                                  uri: GenshinDB.materials(item.name).images.fandom,
                                }}
                                style={{width: 50, height: 50}}
                              />
                            </TouchableOpacity>
                            <Text style={styles.text}>{item.count}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {openModal ? (
        <MaterialDialog visible={openModal} message={materialClicked} onCancel={() => setOpenModal(false)} />
      ) : null}
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
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
  contentWrapper: {
    width,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  avatarWrapper: {
    borderWidth: 1,
    borderRadius: 40,
    padding: 10,
    backgroundColor: colors.contentBackground,
  },
  characterAvatar: {
    width: 60,
    height: 60,
  },
  infoWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },

  text: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.textWhite,
  },

  descriptionWrapper: {
    padding: 20,
    width: '100%',
    marginTop: 20,
    backgroundColor: colors.contentBackground,
  },
  statWrapper: {
    width,
    padding: 20,
    marginTop: 20,
    backgroundColor: colors.contentBackground,
  },
  statLabel: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statContentWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

const markdownStyles = {
  text: {
    text: {
      fontSize: 18,
      color: colors.textWhite,
      fontWeight: '500',
    },
  },
};
