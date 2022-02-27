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
import GenshinDB, {characters, materials} from 'genshin-db';
import {colors} from '../../../assets/colors/colors';
import Feather from 'react-native-vector-icons/Feather';
import {MaterialDialog} from '../../Material/MaterialDialog';

const {width} = Dimensions.get('window');

export const StatTab = props => {
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [materialClicked, setMaterialClicked] = useState('');
  const infos = ['fullname', 'title', 'region', 'birthday', 'weapontype', 'gender', 'element'];
  const [phase, setPhase] = useState(1);
  const [level, setLevel] = useState(20);
  let costs = characters(props.character).costs;
  let ascensions = ['_', 'ascend1', 'ascend2', 'ascend3', 'ascend4', 'ascend5', 'ascend6'];

  const increasePhase = () => {
    if (phase < 6) {
      setPhase(prev => prev + 1);
      if (level < 80) {
        if (level === 20) {
          setLevel(prev => prev + 20);
        } else {
          setLevel(prev => prev + 10);
        }
      }
    }
  };

  const decreasePhase = () => {
    if (phase > 1) {
      setPhase(prev => prev - 1);
      if (level > 20) {
        if (level === 40) {
          setLevel(prev => prev - 20);
        } else {
          setLevel(prev => prev - 10);
        }
      }
    }
  };

  useEffect(() => {
    // console.log(costs[ascensions[phase]]);
    setLoading(false);
    // GenshinDB.setOptions({resultLanguage: 'Vietnamese'});
    // console.log(characters(props.character, {verboseCategories: true}));
    return () => {
      setPhase(1);
      setLevel(20);
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.contentSection}>
            <Text style={styles.heading}>Bio</Text>
            <View style={{marginTop: 20}}>
              {infos.map((info, index) => {
                return (
                  <View style={styles.bioWrapper} key={index}>
                    <View style={styles.bioLeft}>
                      <Text style={styles.text}>{info}</Text>
                    </View>
                    <View style={styles.bioRight}>
                      <Text style={styles.text}>{characters(props.character)[info]}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          {/*  */}
          <View style={styles.contentSection}>
            <Text style={styles.heading}>Ascensions & Materials</Text>
            <View style={styles.updateQuantity}>
              <Feather name="minus-circle" size={20} color={colors.text} onPress={() => decreasePhase()} />
              <Text style={styles.text}>Phase {phase}</Text>
              <Feather name="plus-circle" size={20} color={colors.text} onPress={() => increasePhase()} />
            </View>
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <View style={styles.statWrapper}>
                <View>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 17,
                        backgroundColor: colors.background,
                        padding: 10,
                        marginBottom: 10,
                      },
                    ]}>
                    Level
                  </Text>
                  <Text style={[styles.text, {fontSize: 17, textAlign: 'center'}]}>
                    {characters(props.character).stats(level).level}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 17,
                        backgroundColor: colors.background,
                        padding: 10,
                        marginBottom: 10,
                      },
                    ]}>
                    Base HP
                  </Text>
                  <Text style={[styles.text, {fontSize: 17, textAlign: 'center'}]}>
                    {characters(props.character).stats(level).hp.toFixed(0)}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 17,
                        backgroundColor: colors.background,
                        padding: 10,
                        marginBottom: 10,
                      },
                    ]}>
                    Base ATK
                  </Text>
                  <Text style={[styles.text, {fontSize: 17, textAlign: 'center'}]}>
                    {characters(props.character).stats(level).attack.toFixed(0)}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 17,
                        backgroundColor: colors.background,
                        padding: 10,
                        marginBottom: 10,
                      },
                    ]}>
                    Base DEF
                  </Text>
                  <Text style={[styles.text, {fontSize: 17, textAlign: 'center'}]}>
                    {characters(props.character).stats(level).defense.toFixed(0)}
                  </Text>
                </View>
              </View>
              <View style={styles.materialWrapper}>
                {costs[ascensions[phase]].map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setMaterialClicked(item.name);
                        setOpenModal(true);
                      }}
                      key={index}
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Image source={{uri: materials(item.name).images.fandom}} style={{width: 60, height: 60}} />
                      <Text style={styles.text}>{item.count}</Text>
                    </TouchableOpacity>
                  );
                })}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width,
  },
  contentSection: {
    backgroundColor: colors.contentBackground,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  bioWrapper: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.text,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textWhite,
  },
  bioLeft: {
    width: '50%',
    flexWrap: 'wrap',
  },
  bioRight: {
    width: '50%',
  },
  updateQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  statWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  materialWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
});
